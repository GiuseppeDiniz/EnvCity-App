//@navigation
// Define os tipos e as rotas para stack e bottomTab navigation.
type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  Home: undefined;
  About: undefined;

  AirQuality: { sensorName: string };
  WaterQuality: { sensorName: string };
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

type AboutScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'About'>;
};

type AirQualitySecreenProps = {
  route: RouteProp<RootStackParamList, 'AirQuality'>;
};

type WaterQualityScreenProps = {
  route: RouteProp<RootStackParamList, 'WaterQuality'>;
};

//----------------------------------------------------------------
type TechnicalDetails = {
  producer: string;
  model: string;
  serialNumber: string;
  energy: string;
};

interface ComponentTechnicalDetails extends TechnicalDetails {
  macAddress: string;
  connectivity: string;
}

type Sensor = {
  sensor: string;
  dataType: string;
  location: string;
  type: string;
  unit: string;
  timeZone: string;
  publicAccess: boolean;
  state: string;
  component: string;
  componentType: string;
  componentPublicAccess: boolean;
  technicalDetails: TechnicalDetails;
  componentTechnicalDetails: ComponentTechnicalDetails;
  createdAt: number;
  updatedAt: number;
  componentCreatedAt: number;
  componentUpdatedAt: number;
};

type Provider = {
  provider: string;
  permission: string;
  sensors: Sensor[];
};

//Define a estrutura de dados do catálogo de sensores. Possui um array de provedores, onde cada provedor possui um nome (provider), uma permissão (permission) e um array de sensores, onde cada sensor possui um nome (sensor), um tipo de dado (dataType), uma localização (location), um tipo (type), uma unidade (unit), um timezone (timeZone), um booleano que indica se o sensor é público (publicAccess), um estado (state), um nome do componente (component), um tipo do componente (componentType), um booleano que indica se o componente é público (componentPublicAccess), detalhes técnicos (technicalDetails), detalhes técnicos do componente (componentTechnicalDetails) e informações sobre a criação e atualização do sensor e do componente.
type Catalog = {
  providers: {
    provider: string;
    permission: string;
    sensors: {
      sensor: string;
      dataType: string;
      location: string;
      type: string;
      unit: string;
      timeZone: string;
      publicAccess: boolean;
      state: string;
      component: string;
      componentType: string;
      componentPublicAccess: boolean;
      technicalDetails: TechnicalDetails;
      componentTechnicalDetails: ComponentTechnicalDetails;
      createdAt: number;
      updatedAt: number;
      componentCreatedAt: number;
      componentUpdatedAt: number;
    }[];
  }[];
};

//----------------------------------------------------------------

type SensorData = {
  value: string;
  timestamp: string;
  time: number;
};

type GetSensorResponse = {
  observations: SensorData[];
};

//----------------------------------------------------------------
interface CheckboxState {
  checkbox: {
    checkbox1: boolean;
    checkbox2: boolean;
  };
}

//----------------------------------------------------------------

/*
RootStackParamList
Define os tipos das rotas da stack navigation. Possui os seguintes tipos:

'Root', que é uma NavigatorScreenParams com as rotas da bottomTab navigation;
'Home', que não possui nenhum parâmetro;
'About', que não possui nenhum parâmetro;
'AirQuality', que possui um parâmetro 'sensorName' do tipo string;
'WaterQuality', que possui um parâmetro 'sensorName' do tipo string.
HomeScreenProps
Define os tipos das propriedades do componente 'HomeScreen'. Possui somente a propriedade 'navigation', que é do tipo StackNavigationProp com a tipagem da stack navigation.

AboutScreenProps
Define os tipos das propriedades do componente 'AboutScreen'. Possui somente a propriedade 'navigation', que é do tipo StackNavigationProp com a tipagem da stack navigation.

AirQualityScreenProps
Define os tipos das propriedades do componente 'AirQualityScreen'. Possui somente a propriedade 'route', que é do tipo RouteProp com a tipagem da stack navigation para a rota 'AirQuality'.

WaterQualityScreenProps
Define os tipos das propriedades do componente 'WaterQualityScreen'. Possui somente a propriedade 'route', que é do tipo RouteProp com a tipagem da stack navigation para a rota 'WaterQuality'.

Catalog
Define a estrutura de dados do catálogo de sensores. Possui um array de provedores, onde cada provedor possui um nome (provider), uma permissão (permission) e um array de sensores, onde cada sensor possui um nome (sensor), um tipo de dado (dataType), uma localização (location), um tipo (type), uma unidade (unit), um timezone (timeZone), um booleano que indica se o sensor é público (publicAccess), um estado (state), um nome do componente (component), um tipo do componente (componentType), um booleano que indica se o componente é público (componentPublicAccess), detalhes técnicos (technicalDetails), detalhes técnicos do componente (componentTechnicalDetails) e informações sobre a criação e atualização do sensor e do componente.

SensorData
Define os tipos dos dados de um sensor específico. Possui um valor (value), um timestamp em formato de string (timestamp) e um timestamp em formato numérico (time).

GetSensorResponse
Define a resposta de uma requisição de dados de um sensor específico. Possui um array de observações, onde cada observação é um objeto com os dados do sensor e um timestamp.
*/
