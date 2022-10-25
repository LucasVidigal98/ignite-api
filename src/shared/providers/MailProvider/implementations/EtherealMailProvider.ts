import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    }).catch((err) => console.log(err));
  }

  async sendMail(
    to: string, 
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileConfig = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileConfig);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Test API <noreplay@test.com>',
      text: templateHtml,
      html: templateHtml
    });

    console.log(`Message sent ${message.messageId}`);
    console.log(`Preview URL ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export { EtherealMailProvider };