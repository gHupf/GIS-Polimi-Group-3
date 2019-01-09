<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
  <sld:NamedLayer>
    <sld:Name>GlobeLand30_MI</sld:Name>
    <sld:UserStyle>
      <sld:Name>GlobeLand30_MI</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:Geometry>
              <ogc:PropertyName>grid</ogc:PropertyName>
            </sld:Geometry>
            <sld:ColorMap>
              <sld:ColorMapEntry color="#f9f3c1" opacity="1.0" quantity="10" label="Cultivated Land"/>
              <sld:ColorMapEntry color="#147749" opacity="1.0" quantity="20" label="Forest"/>
              <sld:ColorMapEntry color="#a9d05f" opacity="1.0" quantity="30" label="Grassland"/>
              <sld:ColorMapEntry color="#5cc0a5" opacity="1.0" quantity="40" label="40"/>
              <sld:ColorMapEntry color="#903926" opacity="1.0" quantity="50" label="50"/>
              <sld:ColorMapEntry color="#00569a" opacity="1.0" quantity="60" label="Water body"/>
              <sld:ColorMapEntry color="#2a3eaf" opacity="1.0" quantity="70" label="70"/>
              <sld:ColorMapEntry color="#932f14" opacity="1.0" quantity="80" label="Artificial superficie"/>
            </sld:ColorMap>
            <sld:ContrastEnhancement/>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>