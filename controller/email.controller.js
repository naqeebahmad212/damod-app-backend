const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const { userService } = require("../services");

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
const passwordEmail = async (req, res) => {
  const userPassword = await userService.find(req.body.email);
  if (userPassword) {
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "caterinodiamonds@gmail.com",
          pass: "ikmsdlztcpwwihob",
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    readHTMLFile(
      __dirname + "/emailFormat/passwordEmail.html",
      function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        var template = handlebars.compile(html);
        const replacements = {
          password: userPassword,
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
          from: "dochocabs@gmail.com",
          // to: "arpit@quickhub.in",
          to: req.body.email,
          subject: "Password For Caterino Diamond",
          html: htmlToSend,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(400).json({
              error: "Something Went Wrong",
            });
          } else {
            res.status(200).json({
              status: 200,
              success: "Email Sent SuccessFully!!",
            });
          }
        });
      }
    );
  } else {
    return res.status(404).json({
      status: 404,
      success: "User Not Found",
    });
  }
};

module.exports = {
  passwordEmail,
};
