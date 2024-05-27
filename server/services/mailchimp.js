const Mailchimp = require("mailchimp-api-v3");

const keys = require("../config/keys");

const { key, listKey } = keys.mailchimp;

class MailchimpService {
  init() {
    try {
      return new Mailchimp(key);
    } catch (error) {
      console.warn("Missing mailgun keys");
    }
  }
}

const mailchimp = new MailchimpService().init();
