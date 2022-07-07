const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const Shop = require("../utils/shop");
const { botOwner } = require("../ayarlar.json");
module.exports = {
  name: "ürün-güncelle",
  description: "Sisteme ürün günellersiniz",
  options: [
    {
      name: "ürün-kodu",
      description: "Günceelenicek olan ürünün kodu",
      type: 4,
      required: true,
    },
    {
      name: "ürün-adı",
      description: "Ürünün Adı",
      type: 3,
      required: true,
    },
    {
      name: "ücret",
      description: "Ürünün Ücreti",
      type: 4,
      required: true,
      min_value: 30,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    if(interaction.member.id !== botOwner) return interaction.reply({embeds:[{title:"Hata", description:"Bu komut bot sahibine özeldir"}], ephemeral:true});
    let urun = interaction.options.getString("ürün-adı"),
      ucret = interaction.options.getInteger("ücret"),
      urun_kod = Math.floor(Math.random() * 100000);
    let data = await Shop.findOne({ id: urun_kod });
    if (!data)
      return interaction.reply({
        embeds: [
          {
            title: "Ürün Bulunamadı",
            description: "Belirtilen ürün koduna ait ürün bulunamadı",
          },
        ],
      });
    await shop.updateOne({ id: urun_kod }, { name: urun, balance: ucret });
    interaction.reply({
      embeds: [
        {
          title: "Ürün Güncellendi",
          fields: [
            { name: "Ürün Adı", value: urun, inline: true },
            { name: "Ücret", value: `${ucret}`, inline: true },
            { name: "Ürün Kodu", value: `${urun_kod}`, inline: true },
          ],
        },
      ],
    });
  },
};
