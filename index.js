$('body').terminal({
    dominik: function (cmd) {
        switch (cmd) {
            case 'personal-info':
                this.echo(`[[;white;black]
Personal Information:

[[;#66ccff;black]Name:]
  Dominik Kovacs

[[;#66ccff;black]Age:]
  ${Math.floor((Date.now() - new Date('1995-08-28').getTime()) / 31536000000)}

[[;#66ccff;black]Email:]
  dominik.kovacs28@gmail.com

[[;#66ccff;black]Location:]
  Bratislava, Slovakia

[[;#66ccff;black]Current Contract:]
  UNIQA Group Service Center Slovakia, spol. s r.o.

[[;#66ccff;black]Current Position:]
  Senior Java Software Engineer

Type 'dominik help' for more details on each command.
 ]`);
                break;
            case 'experience':
                this.echo(`[[;white;black]
Work Experience:

[[;#66ccff;black]UNIQA Group Service Center Slovakia, spol. s r.o.]
  Senior Java Software Engineer
  02/2023 - Present; Bratislava, Slovakia
  Specialized in developing and maintaining a scalable chat system between agents and customers using Spring Boot, Spring Cloud, and AWS.

[[;#66ccff;black]EMM spol, s.r.o.]
  Senior Java Software Engineer
  03/2022 - 01/2023; Bratislava, Slovakia
  Implemented and maintained various monolithic applications on Spring Boot.
  Overseeing AWS environment, including EKS, CodeSuite, and more.

[[;#66ccff;black]Indra Avitech s.r.o.]
  Java Software Engineer
  01/2022 - 02/2022; Bratislava, Slovakia
  Developed highly scalable microservices using Quarkus on Kubernetes (AWS EKS).
  Implemented both synchronous (Rest API) and asynchronous (Kafka) communication.

[[;#66ccff;black]Accenture Technology Solutions - Slovakia s.r.o.]
  System Integration Specialist
  11/2018 - 12/2021; Bratislava, Slovakia
  Developed scalable microservices using Quarkus, Kubernetes, and Helm.
  Successfully migrated a card system for a Czech bank to WSO2 enterprise integrator and API manager.

Type 'dominik help' for more details on each command.
 ]`);
                break;
            case 'certificates':
                this.echo(`[[;white;black]
Certificates:

[[;#66ccff;black]AWS Certified Cloud Practitioner:]
  Validity: 12/2020 - 12/2023

[[;#66ccff;black]WSO2 Certified Enterprise Integrator 6 Developer - ESB Profile:]
  Validity: 05/2020 - Present

[[;#66ccff;black]IT v kurze - Java Basics:]
  Validity: 09/2018 - Present

Type 'dominik help' for more details on each command.
 ]`);
                break;
            case 'skills':
                this.echo(`[[;white;black]
Skills:

[[;#66ccff;black]Advanced:]
  Java, Spring Boot, Git, Spring Cloud, Maven, Docker, OpenAPI, Amazon Web Services (AWS), WSO2 API Management

[[;#66ccff;black]Intermediate:]
  Quarkus, Linux, Kubernetes, PostgreSQL, Liquibase, SQL, OAuth2, OpenID Connect

[[;#66ccff;black]Basics:]
  MongoDB, Jenkins, Bash Scripting, JavaScript, Keycloak

Type 'dominik help' for more details on each command.
 ]`);
                break;
            case 'languages':
                this.echo(`[[;white;black]
Languages:

[[;#66ccff;black]Native:]
  Slovak

[[;#66ccff;black]Bilingual:]
  Czech

[[;#66ccff;black]Professional Working Proficiency:]
  English

Type 'dominik help' for more details on each command.
 ]`);
                break;
            case 'contact':
                this.echo(`[[;white;black]
Contact Information:

[[;#66ccff;black]Email:]
  dominik.kovacs28@gmail.com

[[;#66ccff;black]LinkedIn:]
  https://www.linkedin.com/in/kovacsdominik/

[[;#66ccff;black]GitHub:]
  https://github.com/poklakni

Feel free to reach out!

Type 'dominik help' for more details on other commands.
 ]`);
                break;
            case 'help':
                this.echo(`[[;white;black]
Available Commands:

[[;#66ccff;black] General Commands:]
  help           Display available commands and usage.
  personal-info  Show personal information.
  experience     Display work experience details.
  certificates   View certifications and qualifications.
  skills         List technical skills.
  languages      Show language proficiency.
  contact        Display contact information.

[[;#66ccff;black] Additional Information:]
  Type 'clear' to clear the console.
  Use Tab for command auto-completion.

[[;#66ccff;black] Usage Examples:]
  dominik personal-info
  dominik skills
  dominik experience

Type 'dominik help' for more details on each command.
 ]`);
                break;
            default:
                this.error('Error: Invalid command. Type "dominik help" for available commands');
                break;
        }
    }
}, {
    tabcompletion: true,
    completion: function (cmd, callback) {
        callback(
            [
                'help',
                'personal-info',
                'experience',
                'certificates',
                'skills',
                'languages',
                'contact',
                'dominik'
            ]
        );
    },
    greetings: `[[;white;black]
╔══════════════════════════════════════════════════════════════╗
║██╗\u0020\u0020\u0020\u0020██╗███████╗██╗\u0020\u0020\u0020\u0020\u0020\u0020██████╗\u0020██████╗\u0020███╗\u0020\u0020\u0020███╗███████╗║
║██║\u0020\u0020\u0020\u0020██║██╔════╝██║\u0020\u0020\u0020\u0020\u0020██╔════╝██╔═══██╗████╗\u0020████║██╔════╝║
║██║\u0020█╗\u0020██║█████╗\u0020\u0020██║\u0020\u0020\u0020\u0020\u0020██║\u0020\u0020\u0020\u0020\u0020██║\u0020\u0020\u0020██║██╔████╔██║█████╗\u0020\u0020║
║██║███╗██║██╔══╝\u0020\u0020██║\u0020\u0020\u0020\u0020\u0020██║\u0020\u0020\u0020\u0020\u0020██║\u0020\u0020\u0020██║██║╚██╔╝██║██╔══╝\u0020\u0020║
║╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║\u0020╚═╝\u0020██║███████╗║
║\u0020╚══╝╚══╝\u0020╚══════╝╚══════╝\u0020╚═════╝\u0020╚═════╝\u0020╚═╝\u0020\u0020\u0020\u0020\u0020╚═╝╚══════╝║
║\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020Hello,\u0020fellow\u0020explorer\u0020of\u0020the\u0020digital\u0020realm!\u0020I'm\u0020Dominik,\u0020\u0020\u0020\u0020║
║\u0020and\u0020this\u0020is\u0020my\u0020virtual\u0020abode\u0020—\u0020a\u0020command-line\u0020journey\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020through\u0020my\u0020professional\u0020landscape.\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020Type\u0020'dominik\u0020help'\u0020for\u0020usage\u0020info.\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020Type\u0020'clear'\u0020to\u0020clear\u0020the\u0020console.\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
║\u0020Use\u0020Tab\u0020to\u0020complete\u0020commands.\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020║
╚══════════════════════════════════════════════════════════════╝
 ]`,
    prompt: '[[;#99ff99;black]anonymous@dominikkovacs][[;white;black]:][[;blue;black]~][[;white;black]$] '
});