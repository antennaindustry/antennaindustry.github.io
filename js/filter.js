let categories = [
  { id: "all", name: "All" },
  { id: "antenna", name: "Antenna" },
  { id: "rf", name: "RF Module" },
  { id: "microwave", name: "Microwave" },
  { id: "mm-wave", name: "MM-Wave" },
  { id: "measurement", name: "Test & Measurement" },
  { id: "cable-connector", name: "Cable & Connector" },
  { id: "pcb", name: "PCB" },
  { id: "absorber", name: "Absorber" },
  { id: "radome", name: "Radome" },
  { id: "software", name: "Software" }
]

ready(function() {
  categories.forEach(function(category){
    $("#filter").append(
      $("<button />", {
        class: (category.id == "all") ? "active" : "",
        "data-filter": category.id,
        text: category.name
      })
    )
  })
  $("#filter > button").addClass("btn btn-outline-success m-1")
  $("#filter > button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
      $('.filter').show('1000');
    }
    else {
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');
    }

    $("#filter > button").removeClass("active")
    $(this).addClass("active");
  });
})
