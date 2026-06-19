import { Link } from 'react-router-dom'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-full flex bg-[#212121]">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[#171717] border-r border-[#2f2f2f]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500
            flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-[#ececec]">Neo</span>
        </div>

        <div>
          <h1 className="text-4xl font-semibold text-[#ececec] leading-tight">
            Your AI assistant,<br />always ready to help.
          </h1>
          <p className="text-[#8e8ea0] mt-4 text-lg leading-relaxed">
            Ask questions, write code, draft emails, and brainstorm ideas — all in one place.
          </p>
        </div>

        <p className="text-sm text-[#8e8ea0]">
          Trusted by thousands of users worldwide
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500
              flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-[#ececec]">Neo</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#ececec]">{title}</h2>
            {subtitle && <p className="text-[#8e8ea0] mt-2">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-[#424242]" />
      <span className="text-xs text-[#8e8ea0] uppercase tracking-wide">or</span>
      <div className="flex-1 h-px bg-[#424242]" />
    </div>
  )
}

export function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="text-center text-sm text-[#8e8ea0] mt-6">
      {text}{' '}
      <Link to={to} className="text-emerald-400 hover:text-emerald-300 font-medium">
        {linkText}
      </Link>
    </p>
  )
}
