import nodemailer from "nodemailer";
import { queryUsersRepositories } from "../../common/composition-root";
import { usersService } from "../../common/composition-root";
import { SETTINGS } from "../../core/settings/settings";

export class nodemailerApplication {
  async sendEmail(email: string, code: string) {
    try {
      let transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: SETTINGS.userMail,
          pass: SETTINGS.userPass,
        },
      });

      let info = await transport.sendMail({
        from: "autotest test",
        to: email,
        subject: "register",
        html: `
            <h1>Thanks for your registration</h1>
            <p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
            </p>`,
      });
      console.log("Email sent:", info.messageId);
    } catch (err) {
      console.error("Send error:", err);
    }
  }
  async confirmEmail(code: string): Promise<boolean | null> {
    const findUser = await queryUsersRepositories.findUserByCode(code);
    if (!findUser) return null;
    if (
      (findUser.emailConfirmation.expirationDate as Date) < new Date() ||
      findUser.emailConfirmation.isConfirmed
    ) {
      return null;
    }

    await usersService.updateUserConfirmation(findUser.id);
    return true;
  }
}

