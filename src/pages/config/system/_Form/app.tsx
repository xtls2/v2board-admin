import type { FC } from 'react'
import { useIntl } from 'umi'
import { useRef } from 'react'
import { useDebounceFn } from 'ahooks'

export interface formAppProps {
  windowsVersion: string
  windowsDownloadUrl: string
  macosVersion: string
  macosDownloadUrl: string
  androidVersion: string
  androidDownloadUrl: string
  onChange: (data: Record<string, any>) => void
}

const FormApp: FC<Partial<formAppProps>> = (props) => {
  const {
    windowsVersion,
    windowsDownloadUrl,
    macosVersion,
    macosDownloadUrl,
    androidVersion,
    androidDownloadUrl,
    onChange,
  } = props
  const windowsVersionRef = useRef<HTMLInputElement>(null)
  const windowsDownloadUrlRef = useRef<HTMLInputElement>(null)
  const macosVersionRef = useRef<HTMLInputElement>(null)
  const macosDownloadUrlRef = useRef<HTMLInputElement>(null)
  const androidVersionRef = useRef<HTMLInputElement>(null)
  const androidDownloadUrlRef = useRef<HTMLInputElement>(null)

  const intl = useIntl()

  const { run } = useDebounceFn(
    () => {
      const data: Record<string, any> = {
        windows_version: windowsVersionRef.current?.value,
        windows_download_url: windowsDownloadUrlRef.current?.value,
        macos_version: macosVersionRef.current?.value,
        macos_download_url: macosDownloadUrlRef.current?.value,
        android_version: androidVersionRef.current?.value,
        androidDownloadUrlRef: androidDownloadUrlRef.current?.value,
      }
      onChange?.(data)
    },
    { wait: 1000 },
  )

  const changeHandler = run

  return (
    <>
      <div className="block-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">
                {intl.formatMessage({ id: 'module.config.system.app.warning' })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.app.windows_version' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.app.windows_version.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="1.0.0"
              defaultValue={windowsVersion}
              onChange={changeHandler}
              ref={windowsVersionRef}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="https://xxxx.com/xxx.exe"
              defaultValue={windowsDownloadUrl}
              onChange={changeHandler}
              ref={windowsDownloadUrlRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.app.macos_version' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.app.macos_version.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="1.0.0"
              defaultValue={macosVersion}
              onChange={changeHandler}
              ref={macosVersionRef}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="https://xxxx.com/xxx.dmg"
              defaultValue={macosDownloadUrl}
              onChange={changeHandler}
              ref={macosDownloadUrlRef}
            />
          </div>
        </div>
        <div className="row p-4 border-bottom">
          <div className="col-lg-6">
            <div className="font-weight-bold my-1">
              {intl.formatMessage({ id: 'module.config.system.app.android_version' })}
            </div>
            <div className="font-size-sm my-1">
              {intl.formatMessage({ id: 'module.config.system.app.android_version.tip' })}
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <input
              type="text"
              className="form-control"
              placeholder="1.0.0"
              defaultValue={androidVersion}
              onChange={changeHandler}
              ref={androidVersionRef}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="https://xxxx.com/xxx.apk"
              defaultValue={androidDownloadUrl}
              onChange={changeHandler}
              ref={androidDownloadUrlRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default FormApp
