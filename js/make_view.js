function inputChange(event){
    let arr = etcPasswd.value.split('\n');
    let passwdTable = "<table>";
    let passwdElementTitle = ["User Name 🕵", "Password 🔐", "User ID", "Group ID", "Comment 📝", "Home Directory 🏠", "Login Shell 💻"];

    // make a table headline
    passwdTable += "<tr>";
    passwdTable += passwdElementTitle.map(function(elm) {
        return "<th>" + elm + "</th>";
      }).join('');
    passwdTable += "</tr>";

    // make table elements
    arr.forEach(function(line, index) {
        if (line !== "") {
            let i = line.split(':');
            if (i.length !== 7) {
                if (document.getElementById('displayInvalidElement').checked) {
                    passwdTable += '<tr class="invalid_line"><td>Invalid element on line' + index + '</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
                } else {
                    passwdTable += '';
                }
            } else {
                let tmp = "<tr>";
                let flag_nologin = false;
                i.forEach(function(l, q) {
                    if (l == "/usr/sbin/nologin" || l == "/bin/false" || l == "/bin/sync") {
                        flag_nologin = true;
                    }
                    tmp += "<td>";
                    tmp += l;
                    tmp += "</td>";
                });
                if (!flag_nologin) {
                    tmp = tmp.replace("tr", 'tr class="login"');
                }
                tmp += "</tr>";
                if (document.getElementById('oinlyLoginAble').checked && flag_nologin) {
                    tmp = '';
                }
                passwdTable += tmp;
            }
        }
    });
    passwdTable += "</table>";
    etc_passwd_view.innerHTML = passwdTable;
};

// Get etcPasswd's element
let etcPasswd = document.getElementById('etcPasswd');
etcPasswd.addEventListener('input', inputChange);

let displayInvalidElement = document.getElementById('displayInvalidElement');
displayInvalidElement.addEventListener('input', inputChange);

let oinlyLoginAble = document.getElementById('oinlyLoginAble');
oinlyLoginAble.addEventListener('input', inputChange);

// make view and put it on window
let etc_passwd_view = document.getElementById('etc_passwd_view');
