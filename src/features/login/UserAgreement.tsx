import type { FC } from "react"

type UserAgreementProps = {
  onAgree: () => void
  onDisagree: () => void
}

export const UserAgreement: FC<UserAgreementProps> = ({ onAgree, onDisagree }) => {
  // const title = "年度数据报告用户协议"
  return (
    <div className="w-full h-full flex flex-col items-center divide-y-2">
      <div className="w-full flex justify-between items-center">
        <h2 className="p-4 font-bold">年度数据报告用户协议</h2>
        {/* <button className="w-14 h-14 flex justify-center items-center focus:outline-none" onClick={onClose} onKeyDown={onClose}><MdClose size={24}/></button>  */}
      </div>
      <div className="p-4 overflow-y-scroll">
        <div className="prose max-w-full">
          <p>
            感谢您阅读《枝网年度报告使用协议》！您正式使用枝网年度报告之前应仔细阅读并充分理解本协议中的全部内容,如您不同意本协议中的任何条款，请立即停止使用枝网年度报告。您使用枝网年度报告的行为将被视为已经仔细阅读、充分理解并毫无保留地接受本协议所有条款。
          </p>
          <h4>1. 制作年度报告</h4>
          <p>
            枝网年度报告可以帮助您生成一份专属年度报告, 为此，枝网需要您授权我们获取您在哔哩哔哩网站上的一些公开信息，主要包括:您的头像、昵称、历史发言记录、历史弹幕记录。您理解并同意，上述信息是枝网生成年度报告的必备信息，如您拒绝授权使用，枝网将无法为您制作并提供专属年度报告。未经您的书面同意，我们保证不以超越本协议约定范围使用您的个人信息。
          </p>
          <h4>2. 使用年度报告</h4>
          <p>
            枝网提供的年度报告仅限您个人使用，您可自行留存欣赏或无偿分享、公开。您理解并同意，如因您分享、公开年度报告而产生的任何损失（包括但不限于个人信息泄露等）应由您自行承担，请您在分享、公开年度报告前审慎考虑。
          </p>
          <h4>3. 知识产权</h4>
          <p>
            年度报告内容（包括但不限于软件、技术、程序、网页、文字、图片、音频、视频、页面设计等）系开源产
            品；此外，您的年度报告中包含的个人发言内容的知识产权由实际权利人享有。您理解并同意，如您希望以任何形式将年度报告或年度报告中的内容素材用于本协议约定范围之外，应当经过所有实际权利人的许可。
          </p>
          <h4>4. 隐私政策</h4>
          <p>
            我们使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权的访问、公开披露、使用、修改，防止数据发生损坏或丢失。我们会采取- -切合理可行的措施，保护您的个人信息。例如使用SSL对数据进行加密保护;我们已建立访问控制机制，确保只有授权人员才可以访问个人信息；如您对隐私政策的内容或使用我们的服务时遇到的与隐私保护相关的事直有任何疑问或进行咨询或投诉时，您均可以通过我们B站官方账号私信与我们取得联系
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-sm p-4 flex justify-around items-center">
          <button
            className="w-36 mx-2 py-2 px-4 text-center bg-white text-fuchsia-700 rounded-full border border-fuchsia-700 focus:outline-none"
            onClick={onAgree}
          >我同意</button>
          <button
            className="w-36 mx-2 py-2 px-4 text-center bg-fuchsia-700 text-fuchsia-100 rounded-full border border-fuchsia-700 focus:outline-none"
            onClick={onDisagree}
          >我再想想</button>
        </div>
      </div>
    </div>
  )
}
