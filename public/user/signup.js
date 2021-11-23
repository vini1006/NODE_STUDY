window.onload = () => {
    const signUpButton = document.getElementById('signup');
    signUpButton.addEventListener('click', async (req, res) => {
        const id = document.getElementById('inpId')?.value;
        const password = document.getElementById('inpPass')?.value;
        const email = document.getElementById('inpEmail')?.value;

        if(!id || !password || !email) return alert("빈칸 채워주세요.");

        try {
            const axiosResult = await axios.post('/user/signup', { id, password, email });
            alert('회원가입 성공');
            location.href = axiosResult.data.redirect;
        } catch (error) {
            let errMsg = error;
            if(error === "DUPLICATED") errMsg = "중복";
            console.error(error);
            return alert(errMsg);
        }
        
    })
}