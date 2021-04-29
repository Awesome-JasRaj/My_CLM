const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var LicenseAuthoritySchema = new Schema({
    licenseAuthority: {
        type: String
    }
});

var LicenseAuthority = mongoose.model("LicenseAuthority",LicenseAuthoritySchema);
module.exports = LicenseAuthority;