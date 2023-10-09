function showErr (errMsg) {
    document.getElementById('errors').innerHTML = ''
    let err = document.createElement('div')
    err.classList = 'error'
    err.innerHTML = errMsg
    document.getElementById('errors').append(err)
    $('#errors').fadeIn('slow')
    $('.loader').fadeOut()

    setTimeout(() => {
        $('#errors').fadeOut('slow')
    }, 3500);
    return false
}

$('#register_form').on('submit', function (e) {
    e.preventDefault();
    const form = document.getElementById("register_form");

    let title = "New Registeration"
    let type =  form.getElementsByTagName('type').value == '1' ? "Kitchen owner" : "Brand owner"
    let name =  form.querySelector("#name").value
    let email =  form.querySelector("#email").value
    let website =  form.querySelector("#website").value
    let Brand =  form.querySelector("#Brand").value
    let country =  form.querySelector("#country").value
    let city =  form.querySelector("#city").value
    let province =  form.querySelector("#province").value

    if (!type)
        showErr("please choose your type")

    if (!name)
        showErr("please enter your name")
    else if (!email)
        showErr("please enter your email")
    else if (!Brand)
        showErr("please enter your Brand Name")
    else if (!country)
        showErr("please enter your country")
    else if (!city)
        showErr("please enter your city")
    else if (!province)
        showErr("please enter your province")

    let content = `
        <b>Type:</b> ${type}, <br>
        <b>Name:</b> ${name}, <br>
        <b>Email:</b> ${email}, <br>
        ${website ? `<b>Website:</b> ${website}, <br>` : ''}
        <b>Brand Name:</b> ${Brand}, <br>
        <b>Country:</b> ${country}, <br>
        <b>City:</b> ${city}, <br>
        <b>Province:</b> ${province}, <br>
    `

    if (type && name && email && Brand && country && city && province)
        $.ajax({
            url: `./sendEmailBackEnd/sendEmail.php?receiver_mail=kotbekareem74@gmail.com&msg_title=${title}&msg_content=${content}`,
            method: 'POST',
            success: function () {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'success'
                err.innerHTML = 'We have received your registeration and we will contact you later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()
                $('.register_pop_up').fadeOut()
                $('.hide-content').fadeOut()
                $('#register_form').find('input[type="text"], input[type="email"]').val('')
                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 5000);
            },
            errro: function (error) {
                document.getElementById('errors').innerHTML = ''
                let err = document.createElement('div')
                err.classList = 'error'
                err.innerHTML = 'server error try again later'
                document.getElementById('errors').append(err)
                $('#errors').fadeIn('slow')
                $('.loader').fadeOut()

                setTimeout(() => {
                    $('#errors').fadeOut('slow')
                }, 3500);

                console.error(error);
            }
        })
})
