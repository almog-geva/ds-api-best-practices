(function () {
angular.module('integrationDemoApp')
    .value('appSettings', {
        menu: [
            {name:'Signing via Email', subMenu: [
                {name:'Description', link:"https://www.docusign.com/developer-center/quick-start/request-signatures"},
                {name:'Code Sample', link:"http://iodocs.docusign.com/APIWalkthrough/requestSignatureFromDocument"}
            ]},
            {name:'Embedded Signing', subMenu: [
                {name:'Example', link:"http://sedemo1.cloudapp.net/dsportals/finance/index.html"},
                {name:'Description', link:"https://www.docusign.com/developer-center/quick-start/embedded-signing"},
                {name:'Code Sample', link:"http://iodocs.docusign.com/APIWalkthrough/embeddedSending"}
            ]},
            {name:'Connect', link:"https://www.docusign.com/developer-center/explore/connect"},
            {name:'API Base URL', link:"loginInfo.html"},
            {name:'Sender View', link:"external:CoSign v7_5 Administrator's Guide.pdf#page=10"},
            {name:'API password', link:"#"},
            {name:'SOBO', link:"#"}
        ],
        currentUrl: ""
    });
}());