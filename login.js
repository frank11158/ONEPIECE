function loginPage_state(a){
    var nowTag = document.querySelector("a.active.item");
    if(nowTag != null)
        nowTag.classList.remove("active");
    a.classList.add("active")
    var seg  = document.querySelector("div.ui.bottom.attached.segment")
    if(nowTag == null || nowTag.id != a.id){
        if(a.id == "reg_tag"){
            seg.innerHTML = '<p>Name</p>\
            <input type="text" id="name" placeholder="USERNAME"></input>\
            <p>Password</p>\
            <input type="password" id="pwd"\ placeholder="PASSWORD"></input>\
            <p>Ensure Password</p>\
            <input type="password" id="ensure" placeholder="PASSWORD\ AGAIN"></input><p id="result"></p>\
            <button id="reg_btn">Register</button>'
            $("#reg_btn").click(function(event){
                console.log("clicked")
                $.ajax({
                    method: "get",
                    url: "./regis",
                    data: {
                        usrName: $("#name").val(),
                        pw: forge_sha256($("#pwd").val()),
                        pw_re: forge_sha256($("#ensure").val()),
                    },
                    success: function(data){
                        $("#result").html(data)
                        $("#name").val("")
                        $("#pwd").val("")
                        $("#ensure").val("")
                    }
                })
            })
        }else if(a.id == "signin_tag"){
            seg.innerHTML = '<p>Name</p>\
            <input type="text" id="name" placeholder="USERNAME"></input>\
            <p>Password</p>\
            <input type="password" id="pwd"\ placeholder="PASSWORD"></input><p id="result"></p>\
            <button id="login_btn">Login</button>'
            $("#login_btn").click(function(event){
                $.ajax({
                    method: "get",
                    url: "./signIn",
                    data:{
                        usrName: $("#name").val(),
                        pw: forge_sha256($("#pwd").val())
                    },
                    success: function(data){
                        switch(data.state){
                            case 0:
                                $("#result").html("user not exist")
                                $("#name").val("")
                                $("#pwd").val("")
                                break;
                            case 1:
                                $("#result").html("Welcome, " + data.name)
                                $("#name").val("")
                                $("#pwd").val("")
                                window.location.replace("content.html");
                                break;
                            case 2:
                                $("#result").html("sorry " + data.name + ", your password is wrong ")
                                $("#pwd").val("")
                                break;
                        }
                    }
                })    
            })
        }else if(a.id == "changeP_tag"){
            seg.innerHTML = '<p>Name</p>\
            <input type="text" id="name"\ placeholder="USERNAME"></input>\
            <p>Old Password</p>\
            <input type="password" id="old_pwd" placeholder="OLD\ PASSWORD"></input>\
            <p>New Password</p>\
            <input type="password" id="new_pwd" placeholder="NEW\ PASSWORD"></input><p id="result"></p>\
            <button id="change_pw">Change Password</button>'
            $("#change_pw").click(function(event){
                $.ajax({
                    method: "get",
                    url: "./changePW",
                    data:{
                        usrName: $("#name").val(),
                        old_pw: forge_sha256($("#old_pwd").val()),
                        new_pw: forge_sha256($("#new_pwd").val()),
                    },
                    success: function(data){
                        switch(data.state){
                            case 0:
                                $("#result").html("user not exist")
                                $("#name").val("")
                                $("#old_pwd").val("")
                                $("#new_pwd").val("")
                                break;
                            case 1:
                                $("#result").html("password changed")
                                $("#name").val("")
                                $("#old_pwd").val("")
                                $("#new_pwd").val("")
                                break;
                            case 2:
                                $("#result").html("sorry , your password is wrong ")
                                $("#old_pwd").val("")
                                $("#new_pwd").val("")
                                break;
                        }
                    }
                })
            })
        }
    }
    console.log(a)
}

function info(a){
    console.log(a)
    var nowTag = document.querySelector("a.active.item");
    nowTag.classList.remove("active");
    var seg  = document.querySelector("div.ui.bottom.attached.segment")
    seg.innerHTML = '<p>Please sign in first to access the website</p>'
}


$("#login_btn").click(function(event){
    $.ajax({
        method: "get",
        url: "./signIn",
        data:{
            usrName: $("#name").val(),
            pw: forge_sha256($("#pwd").val())
        },
        success: function(data){
            switch(data.state){
                case 0:
                    $("#result").html("user not exist")
                    $("#name").val("")
                    $("#pwd").val("")
                    break;
                case 1:
                    setCookie("Username", $("#name").val(), 6);
                    $("#result").html("Welcome, " + data.name)
                    $("#name").val("")
                    $("#pwd").val("")
                    window.location.replace("content.html");
                    break;
                case 2:
                    $("#result").html("sorry " + data.name + ", your password is wrong ")
                    $("#pwd").val("")
                    break;
            }
        }
    })    
})

function setCookie(cname,cvalue,exmins) {
    var d = new Date();
    d.setTime(d.getTime() + (exmins*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
