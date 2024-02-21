import cheerio from "cheerio";
import got from "got";

export default class TelegramScraper {
  constructor(opt) {
    this.chat_url = `https://t.me/s/`;
    this.token = `${opt.token}`;
  }

  async chat(name) {
    try {
      const rawdata = await got(`${this.chat_url}${name}`);
      const $ = cheerio.load(rawdata.body);
      let chat_title = $("title").text();
      let chat_img = $(".tgme_page_photo_image.bgcolor3 img").attr("src");
      let subscribers = $(".tgme_header_counter").text().split(" ")[0];
      const dataArray = [];
      $(".tgme_widget_message").each((index, element) => {
        const text = $(element).find(".tgme_widget_message_text").text().trim();
        const views = $(element).find(".tgme_widget_message_views").text().trim();
        const time = $(element).find(".tgme_widget_message_date time").attr("datetime");
        let img = "";
        const styleAttribute = $(element).find(".tgme_widget_message_photo_wrap.grouped_media_wrap").attr("style");
        if (styleAttribute) {
          const match = styleAttribute.match(/background-image:url\('([^']+)'\)/);
          if (match) {
            img = match[1];
          }
        }
        const link = $(element).find(".tgme_widget_message_info a").attr("href");
        img !== ""
          ? dataArray.push({
              id: link.split("/")[4],
              type: "image",
              text: text || "No Text",
              views,
              time,
              img: img || "No Image",
              link: link || "",
            })
          : dataArray.push({
              id: link.split("/")[4],
              type: "text",
              text: text || "No Text",
              views,
              time,
              url: link || "",
            });
      });
      return {
        chat_title,
        chat_img,
        subscribers,
        data: dataArray,
      };
    } catch (error) {
      throw error;
    }
  }

  async sticker(sticker_pack) {
    try {
      let res = await got.post(`https://api.telegram.org/bot${this.token}/getStickerSet`, {
        json: true,
        searchParams: { name: sticker_pack },
      });
      const stickers = JSON.parse(res.body).result;
      const linkPromises = stickers?.stickers.map(async (item) => {
        const pathResponse = await got.post(`https://api.telegram.org/bot${this.token}/getFile`, {
          searchParams: { file_id: item.file_id },
          json: true,
        });
        return JSON.parse(pathResponse.body).result;
      });
      const results = await Promise.allSettled(linkPromises);
      const links = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);
      return {
        name: sticker_pack,
        title: stickers.title,
        is_animated: stickers.is_animated,
        is_video: stickers.is_video,
        stickers: links.map(
          (item) => `https://api.telegram.org/file/bot${this.token}/${item.file_path}`
        ),
      };
    } catch (error) {
      throw Error(error);
    }
  }
}