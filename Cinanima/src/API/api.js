
/**
 * @param {string} apiBaseUrl
 * @param {string} endPoint
 * @returns a promise object
 */

export async function get(apiBaseUrl, endPoint)
{
    try
    {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`)
        return handleResponse(response)
    }
    catch (error)
    {
        throw error
    }
}


/**
 * @param {string} apiBaseUrl
 * @param {string} endPoint
 * @param {string} data
 * @returns a promise object
 */

export async function post(apiBaseUrl, endPoint, data)
{
    try
    {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`,
        {
            method: "POST",
            headers:
            {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        },
        )
        return handleResponse(response)
    }
    catch (error)
    {
        throw error
    }
}

async function handleResponse(response)
{
    if (!response.ok)
    {
        const errorMessage = await response.text();
        throw new Error(`API request failed with status ${response.status} ${errorMessage}`)
    }
    const data =  await response.json()
    return data
}
