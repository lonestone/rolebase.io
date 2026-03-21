import React, { useMemo } from 'react'
import * as Flags from 'country-flag-icons/react/3x2'
import { LANG_TO_COUNTRY, getLangName } from '../utils/langs.js'

const FlagComponents = Flags as Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
>

interface Props {
  lang: string
  active: boolean
  onClick: () => void
}

export default function LangButton({ lang, active, onClick }: Props) {
  const country = LANG_TO_COUNTRY[lang]
  const FlagIcon = country ? FlagComponents[country] : undefined
  const label = useMemo(() => getLangName(lang), [lang])

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center gap-1.5 cursor-pointer text-xs leading-none px-3 pt-1 pb-2.5 mt-1.5 -my-px rounded-t-lg border z-1 transition-colors ${
        active
          ? 'border-border border-t-gray-300 border-b-transparent bg-bg'
          : 'border-transparent text-text-muted hover:border-border'
      }`}
    >
      {FlagIcon && <FlagIcon className="w-4 h-3 rounded-sm shrink-0" />}
      <span>{label}</span>
    </button>
  )
}
