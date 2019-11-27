

webix.ready(function () {
  webix.ui({
    view: "window",
    id: "addItemWin",
    height: window.innerHeight * 0.75,
    width: window.innerWidth * 0.75,
    modal: true,
    position: "center",
    headHeight: 0,
    on: {
      "onShow": function () {
        document.getElementsByClassName("webix_hidden_upload")[0].style.display = "none";
      }
    },
    body:
    {
      rows: [
        {
          id: "links",
          url: "/old/database/api/v1/favorites/links?class=Industry",
          view: "datatable", select: "row",
          columns: [
            { id: "portfolio", header: "", template: mark_portfolio, fillspace: 1 },
            { id: "category", header: ["Category", { content: "textFilter", contentId: "categoryHead"/*, options: categoryOptions*/ }], editor: "text", fillspace: 4 },
            // { id: "title", header: ["Title", { content: "textFilter", contentId: "titleHead" }], editor: "text", fillspace: 11 },
            { id: "url", header: ["URL", { content: "textFilter", contentId: "urlHead" }], template: "<a href='javascript:linkClick()'>#url#</a>", editor: "text", fillspace: 11 },
          ],
          on: {
            "onAfterLoad": function () {
              setTimeout(function () { $$("links").sort("category", "asc") }, 2000)
            },
            "onAfterSelect": function (id) {
              $$("companyName").setValue(this.getItem(id).title)
            },
          },
          scroll: false,
        },
        { id: "companyName", view: "text", label: "Name" },
        {
          cols: [
            { id: "companyLogoUrl", view: "text", label: "Logo", placeholder: "Enter url or browse file..." },
            {
              view: "uploader",
              id: "companyLogoBrowse",
              name: "file",
              value: "Browse",
              upload: "/filesystem/api/v1/files",
              formData: { users: ["guest"], folder: "portfolio/industry" },
              multiple: false, autosend: false,
              width: 70,
              on: {
                "onAfterFileAdd": function (file) {
                  $$("companyLogoUrl").setValue(file.name)
                }
              }
            },
          ]
        },
        {
          cols: [
            { id: "closeAddItemWin", view: "button", type: "danger", label: "Close", click: function () { $$("addItemWin").hide() } },
            {
              id: "addItem", view: "button", label: "Add", click: function () {
                $$("companyLogoBrowse").send(function (response) {
                  if (response.n) {
                    var item = $$("links").getSelectedItem()
                    if (item) {
                      var users = item.users
                      if (users.indexOf("guest") === -1) users.push("guest")
                      var update = { users: users, portfolio: "industry", logo: response.insertedId, title: $$("companyName").getValue() }
                      webix.ajax().headers({ "Content-type": "application/json" }).put("/database/api/v1/favorites/links/" + item._id, update, function (t, d, x) {
                        if (d.json().nModified) {
                          $$("links").updateItem(item.id, Object.assign(item, update));
                        }
                        else {
                          $$("links").updateItem(item.id, Object.assign(item, {}));
                        }
                      })
                    }
                    else webix.message("Please select a company.")
                  }
                })
              }
            },
          ]
        },
      ],
    }
  })
});

function mark_portfolio(obj) {
  if (obj.portfolio) {
    if (obj.portfolio == "industry") return "<span style='color:#3c763d; font-weight:bold'>&#10003;</span>"
  }
  return ""
}

// linkclick
function linkClick() {
  var item = $$("links").getSelectedItem()
  open(item.url)
}

function openaddItemWin() {
  $$("addItemWin").show()
}
