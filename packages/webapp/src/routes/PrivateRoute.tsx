import AppsPage from '@/apps/pages/AppsPage'
import OAuthRedirectPage from '@/apps/pages/OAuthRedirectPage'
import CrispSetUser from '@/common/atoms/CrispSetUser'
import Loading from '@/common/atoms/Loading'
import TextError from '@/common/atoms/TextError'
import useInitUserflow from '@/common/hooks/useInitUserflow'
import Page404 from '@/common/pages/Page404'
import SuperAdminPage from '@/common/pages/SuperAdminPage'
import LoggedLayout from '@/layout/components/LoggedLayout'
import Onboarding from '@/onboarding/components/Onboarding'
import ImportPage from '@/org/pages/ImportPage'
import MemberInvitationPage from '@/org/pages/MemberInvitationPage'
import OrgsPage from '@/org/pages/OrgsPage'
import useSuperAdmin from '@/user/hooks/useSuperAdmin'
import VerifyEmailModal from '@/user/modals/VerifiyEmailModal'
import UserInfoPage from '@/user/pages/UserInfoPage'
import { replaceOldIds } from '@api/functions'
import { App_Type_Enum, useOrgsSubscription } from '@gql'
import { useUserId, useUserLocale } from '@nhost/react'
import { useStoreActions } from '@store/hooks'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { langs, locales } from 'src/i18n'
import OrgRoute from './OrgRoute'

export default function PrivateRoute() {
  const superAdmin = useSuperAdmin()
  const navigate = useNavigate()
  const userId = useUserId()
  const {
    i18n: { changeLanguage },
  } = useTranslation()

  // Init Userflow
  useInitUserflow()

  // Update translation language with user's locale in DB
  const userLocale = useUserLocale()
  useEffect(() => {
    if (userLocale && langs.includes(userLocale as keyof typeof locales)) {
      changeLanguage(userLocale)
    }
  }, [])

  // Subscribe to orgs
  const result = useOrgsSubscription({
    skip: !userId,
    variables: { userId: userId! },
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
        <Route path="import" element={<ImportPage />} />

        <Route path="orgs/:orgId/*" element={<OrgRoute />} />
        <Route path="apps" element={<AppsPage />} />
        <Route
          path="apps/office365-auth-redirect"
          element={<OAuthRedirectPage type={App_Type_Enum.Office365} />}
        />
        <Route
          path="apps/googlecalendar-auth-redirect"
          element={<OAuthRedirectPage type={App_Type_Enum.GoogleCalendar} />}
        />
        <Route path=":slug/*" element={<OrgRoute />} />

        {superAdmin && <Route path="admin" element={<SuperAdminPage />} />}

        <Route path="*" element={<Page404 />} />
      </Routes>

      <CrispSetUser />
      <VerifyEmailModal />
      <Onboarding />
    </LoggedLayout>
  )
}
