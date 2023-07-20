const bcryptjs = require('bcryptjs');





(async function () {

    const pass = await bcryptjs.hash("Adtraders@2019", 12)
    console.log(pass);


    const compare = await bcryptjs.compare("Adtraders@2019", pass)
    console.log(compare);
})()

