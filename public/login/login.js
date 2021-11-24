window.onload = () => {
    const getDomById = (id) => {
        return document.getElementById(id);
    }

    getDomById("login").addEventListener("click", async (e) => {
        const inpId = getDomById("inpId");    
        const inpPass = getDomById("inpPass");

        const idVal = inpId.value;
        const passVal = inpPass.value;

        if(!idVal || !passVal) return alert("빈곳을 채워주세요.");

        try {
            const axiosResult = await axios.post('/login', {
                id: idVal
                , password: passVal
            });

            const loginStatus = axiosResult.data.status;
            switch(loginStatus) {
                case "success": {
                    location.href = "/";
                }break;
            }

            location.href = "/board/"

        } catch (error) {
            return alert(error)
        }
    })

    getDomById("signup").addEventListener("click", () => {
        location.href = '/user/signup';
    });

}