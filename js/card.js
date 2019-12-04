ready(function () {
  var el = document.querySelector(".card-columns");
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }

  $.getJSON("json/links3.json", function (companies) {
      console.log(companies.length)
      companies.shuffle()
      for (var i = 0; i < companies.length; i++) {

        var el_div0 = document.createElement("div")
        var el_div0_a0 = document.createElement("a")
        var el_div0_a0_img0 = document.createElement("img")
        var el_div0_a0_div0 = document.createElement("div")
        var el_div0_a0_div0_h50 = document.createElement("h5")

        el_div0_a0_div0_h50.className = "card-title"
        el_div0_a0_div0.className = "card-body"
        el_div0_a0_img0.className = "card-img-top"
        el_div0.className = "card filter " + companies[i].category.replaceAll(",", "")

        // console.log(companies[i].logo)
        // console.log(json2.find(item => item._id.$oid == companies[i].logo))
        // json2.find(item => {
        //   console.log(companies[i].logo)
        //   return item._id.$oid == companies[i].logo
        // })
        if(companies[i].logo.includes("http")){
          el_div0_a0_img0.setAttribute("src", companies[i].logo)
        }
        else{
          el_div0_a0_img0.setAttribute("src", "img/logos/" + companies[i].logo)
        }
        el_div0_a0_img0.setAttribute("alt", companies[i].title)
        el_div0_a0.setAttribute("href", companies[i].url)
        el_div0_a0.setAttribute("target", "_blank")
        el_div0_a0.setAttribute("rel", "noopener noreferrer")

        el_div0_a0_div0_h50.innerHTML = companies[i].title

        el_div0_a0_div0.appendChild(el_div0_a0_div0_h50)
        el_div0_a0.appendChild(el_div0_a0_img0)
        el_div0_a0.appendChild(el_div0_a0_div0)
        el_div0.appendChild(el_div0_a0)
        el.appendChild(el_div0)
      }
  });

})
