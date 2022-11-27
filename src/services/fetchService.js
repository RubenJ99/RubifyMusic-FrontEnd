export default function filterFetch(uri, reqMethod, jwt, payload){
    const heads = {
        headers: {
            "Content-Type":"application/json"
        },
        method: reqMethod
    };

    if(jwt) {
        heads.headers.Authorization = `Bearer ${jwt}`;
    }

    if(payload) {
        heads.body = JSON.stringify(payload);
    }

    return fetch(uri,heads).then((res) => {
        if(res.status === 200) return res.json();
    });
}
