



const onEachFeature = (feature, layer) => {
  layer.on({
      mouseover: (e) => {
          const layer = e.target;
          if (layer !== selectedLayer) { // Only change style if not selected
              layer.setStyle({
                  weight: 5,
                  color: '#666',
                  dashArray: '',
                  fillOpacity: 0.7,
              });
          }

          // Define the keys you want to display
          const keysLayer = ['RT', 'RW', 'Dusun', 'Jumlah Rumah Tangga', 'Jumlah UMKM', 'UMKM Tetap', 'UMKM Non-Tetap'];
          const keysToShow = ['rt', 'rw', 'dusun', 'jml_ruta', 'jml_umkm', 'jml_umkm_tetap', 'jml_umkm_nontetap'];

          // Create a popup with the specified keys
          const popupContent = `<div>
            <strong>Informasi:</strong><br>
            ${keysToShow.map((key, index) => `${keysLayer[index]}: ${feature.properties[key]}`).join('<br>')}
          </div>`;

          layer.bindPopup(popupContent).openPopup();
      },

      mouseout: (e) => {
          const layer = e.target;
          if (layer !== selectedLayer) { // Only reset style if not selected
              layer.setStyle({
                  weight: 2,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
              });
          }

          // Close the popup
          layer.closePopup();
      },

      click: (e) => {
          const layer = e.target;

          if (selectedLayer) {
              // Reset style of previously selected layer
              selectedLayer.setStyle({
                  weight: 2,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7, // Ensure it matches the default opacity
              });
          }

          if (selectedLayer === layer) {
              // Deselect the current layer if it was already selected
              selectedLayer = null;
              setFilteredData(data[0]); // Set filteredData to initial data
              setSelectedRT('desa'); // Reset selectedRT
          } else {
              // Set the current layer as selected and update its style
              selectedLayer = layer;
              layer.setStyle({
                  weight: 5,
                  color: '#333',
                  dashArray: '',
                  fillOpacity: 0.9, // Change opacity to 1 for highlight
              });

              // Set filteredData to the clicked layer's data
              setFilteredData({
                  type: 'FeatureCollection',
                  features: [feature] // Wrap the feature in a FeatureCollection
              });

              // Set selectedRT to the clicked layer's RT value
              const rt = feature.properties.rt;
              setSelectedRT(rt);
          }
      }
  });
};