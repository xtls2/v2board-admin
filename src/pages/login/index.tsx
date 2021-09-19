import { useLayoutEffect, useRef } from 'react'
import { login, checkAuth } from '@/services'
import { history, useModel, Link, useIntl } from 'umi'
import { useLockFn } from 'ahooks'
import delay from '@umijs/utils/lib/delay/delay'
import { title, description, backgroundUrl, noPermissionPath } from '@/default'

const LoginPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      })
    }
  }

  const checkLogin = async () => {
    const authResult = await checkAuth()

    if (authResult === undefined || authResult.data === undefined) {
      return
    }

    if (authResult.data.is_login && authResult.data.is_admin) {
      if (initialState?.currentUser === undefined) {
        fetchUserInfo()
      }
      history.replace('/')
    }
  }

  useLayoutEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 此方法会跳转到 redirect 参数所在的位置 */
  const goto = () => {
    delay(10).then(() => {
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
    })
  }

  const submitHandler = useLockFn(async () => {
    const email = emailInputRef.current?.value as string
    const password = passwordInputRef.current?.value as string

    const resp = await login({ email, password })
    if (resp === undefined) {
      return
    }

    if (!resp.data.is_admin) {
      history.replace(noPermissionPath)
      return
    }
    await fetchUserInfo()
    goto()
  })

  return (
    <div id="page-container">
      <main id="main-container">
        <div className="row no-gutters bg-primary-op">
          <div
            className="hero-static col-md-12 d-flex align-items-center v2board-background bg-white"
            style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}}
          >
            <div className="p-3 w-100">
              <div className="mb-12 text-center">
                <Link
                  className="link-fx font-w700 font-size-h1"
                  to="#"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                  }}
                >
                  <span className="text-primary">{title}</span>
                </Link>
                <p className="text-uppercase font-w700 font-size-sm text-muted">{description}</p>
              </div>

              {/* <div className="dropdown"><button type="button" className="btn btn-dual mr-1 v2board-auth-lang-btn" data-toggle="layout" data-action="side_overlay_toggle"><i className="far fa fa-language" /></button><div className="dropdown-menu dropdown-menu-right p-0 false" aria-labelledby="page-header-user-dropdown"><div className="p-2"><a className="dropdown-item">中文</a><a className="dropdown-item">English</a><a className="dropdown-item">日本語</a><a className="dropdown-item">Tiếng Việt</a></div></div></div> */}

              <div className="row no-gutters justify-content-center">
                <div className="col-sm-8 col-xl-6">
                  <form
                    className="js-validation-signin"
                    onSubmit={(e) => {
                      e.preventDefault()
                      submitHandler()
                    }}
                  >
                    <div className="py-3">
                      <div className="form-group">
                        <input
                          className={'form-control form-control-lg form-control-alt'}
                          placeholder={intl.formatMessage({ id: 'common.email' })}
                          ref={emailInputRef}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control form-control-lg form-control-alt"
                          type="password"
                          placeholder={intl.formatMessage({ id: 'common.password' })}
                          ref={passwordInputRef}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-block btn-hero btn-hero-primary"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault()
                          submitHandler()
                        }}
                      >
                        <i className="fa fa-fw fa-sign-in-alt mr-1"> </i>
                        {intl.formatMessage({ id: 'common.login' })}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
