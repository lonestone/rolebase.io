import { replaceOldIds } from '@api/functions'
import Loading from '@atoms/Loading'
import TextError from '@atoms/TextError'
import { useOrgsSubscription } from '@gql'
import useSuperAdmin from '@hooks/useSuperAdmin'
import { useUserId, useUserLocale } from '@nhost/react'
import MemberInvitationPage from '@pages/MemberInvitationPage'
import OrgsPage from '@pages/OrgsPage'
import Page404 from '@pages/Page404'
import SuperAdminPage from '@pages/SuperAdminPage'
import UserInfoPage from '@pages/UserInfoPage'
import { useStoreActions } from '@store/hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { langs, locales } from 'src/i18n'
import LoggedLayout from '../molecules/LoggedLayout'
import OrgIdRoute from './OrgIdRoute'
import OrgSlugRoute from './OrgSlugRoute'

export default function PrivateRoute() {
  const superAdmin = useSuperAdmin()
  const navigate = useNavigate()
  const userId = useUserId()
  const {
    i18n: { changeLanguage },
  } = useTranslation()
  const userLocale = useUserLocale()

  // Update translation language with user's locale in DB
  useEffect(() => {
    if (userLocale && langs.includes(userLocale as keyof typeof locales)) {
      changeLanguage(userLocale)
    }
  }, [])

  // Subscribe to orgs
  const result = useOrgsSubscription({
    skip: !userId,
    variables: { userId: userId!, archived: false },
  })
  const setSubscriptionResult = useStoreActions(
    (actions) => actions.orgs.setSubscriptionResult
  )
  useEffect(() => {
    setSubscriptionResult({
      entries: result.data?.member.map((m) => m.org),
      loading: result.loading,
      error: result.error,
    })
  }, [result])

  // Redirect old urls
  // TODO: Delete this block in 2023
  useEffect(() => {
    const path = window.location.pathname + window.location.search
    // If path contains a Firebase id
    if (/[/=][a-zA-Z0-9]{20}([/&]|$)/.test(path)) {
      replaceOldIds({ text: path }).then((newPath) => {
        navigate(newPath)
      })
    }
  }, [])

  return (
    <LoggedLayout>
      <Loading center active={result.loading} />
      {result.error && <TextError error={result.error} />}

      <Routes>
        <Route index element={<OrgsPage />} />
        <Route
          path="orgs/:orgId/invitation"
          element={<MemberInvitationPage />}
        />
        <Route path="user-info" element={<UserInfoPage />} />

        <Route path="login" element={<Navigate to="/" />} />
        <Route path="reset-password" element={<Navigate to="/" />} />
        <Route path="signup" element={<Navigate to="/" />} />

        <Route path="orgs/:orgId/*" element={<OrgIdRoute />} />
        <Route path=":slug/*" element={<OrgSlugRoute />} />

        {superAdmin && <Route path="admin" element={<SuperAdminPage />} />}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </LoggedLayout>
  )
}
