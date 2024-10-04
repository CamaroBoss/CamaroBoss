// api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
    const { method, url, headers, body } = req;

    try {
        // Forward the request to the target URL
        const response = await axios({
            method: method,
            url: url, // This would be the full URL
            headers: {
                ...headers,
                host: undefined, // Remove host header
                'Content-Type': headers['content-type'] || 'application/json',
            },
            data: body,
        });

        // Send the response back to the client
        res.status(response.status).set(response.headers).send(response.data);
    } catch (error) {
        // Handle errors
        res.status(error.response?.status || 500).json({ message: error.message });
    }
}
