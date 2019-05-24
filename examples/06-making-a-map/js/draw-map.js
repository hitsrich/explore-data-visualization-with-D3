async function drawMap() {
  // Access data
  const countryShapes = await d3.json("./data/world-geojson.json")
  const countryNameAccessor = d => d.properties["NAME"]
  const countryIdAccessor = d => d.properties["ADM0_A3_IS"]

  const dataset = await d3.csv("./data/world_bank_data.csv")
  const metric = "Population growth (annual %)"

  // We want an easy way to look up the population growth using a country name
  let metricDataByCountry = {}
  dataset.forEach(d => {
    if (d["Series Name"] != metric) return
    metricDataByCountry[d["Country Code"]] = d["2017 [YR2017]"] || 0
  })

  // Create chart dimensions
  // Height will depend on our projection - which will use a combonation of distortion (stretching parts of the map) and slicing to approximate the Earth's actual shape
  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  }
  dimensions.boundedWidth = dimensions.width

  // Define our globe using a mock GeoJSON object
  const sphere = ({ type: "Sphere" })
  const projection = d3.geoEqualEarth() // Each projection function has its own default size (think: range)
    .fitWidth(dimensions.boundedWidth, sphere)  // Define our projection to be the same width as our bounds
  const pathGenerator = d3.geoPath(projection)  // Generator function to help create our geographical shapes

  // Test
  // console.log(pathGenerator(sphere))  // Gives us a <path> d string

  // // How do we find out how tall that path is? Use the .bounds() method of the pathGenerator
  // console.log(pathGenerator.bounds(sphere))
  // // Returns an array of [x, y] coordinates describing a bounding box for the specified GeoJSON object

  const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)

  // We want the entire Earth to fit without our bounds, so define our boundedHeight to just cover the sphere
  dimensions.boundedHeight = y1
  dimensions.height = dimensions.boundedHeight

  // Draw canvas

  // Create scales

  // Draw data

  // Draw peripherals

  // Set up interactions

}
drawMap()