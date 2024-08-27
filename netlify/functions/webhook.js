const axios = require('axios');

exports.handler = async (event) => {
    const requestData = {
        MessageID: 1,
        Password: '2yQQC[<6KiXuMM];%R&lv>-1,)a/Cfheacbc~|wI+DE:19[w4$TAqb9GX(~r^.',
        MessageType: 'BopJob',
        PhoneNumber: event.PhoneNumber,
        ApiVersion: 5,
        BOP: true,
        CLI: false
    };

    const ivrServiceUrl = 'https://66c4e98ac73f903d5593bc67--bifrost-sofia.netlify.app/ivr-endpoint';

    try {
        const response = await axios.post(ivrServiceUrl, requestData);
        console.log('Respuesta del servidor:', response.data);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Request enviado exitosamente',
                data: response.data
            }),
        };
    } catch (error) {
        console.error('Error al enviar el request:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al enviar el request',
                error: error.message
            }),
        };
    }
};

