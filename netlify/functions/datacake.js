exports.handler = async function(event) {
  const FIELD = event.queryStringParameters.field;
  const query = `query { device(deviceId:"7c087f2f-577e-47b1-b38f-d728deeb6860") { currentMeasurements(allActiveFields: true) { value field { fieldName } } } }`;

  const response = await fetch('https://api.datacake.co/graphql/', {
    method: 'POST',
    headers: {
      'Authorization': 'Token ' + process.env.DATACAKE_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const measurements = data.data.device.currentMeasurements;
  const match = measurements.find(m => m.field.fieldName === FIELD);
  const value = match ? match.value : null;

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ value })
  };
};
