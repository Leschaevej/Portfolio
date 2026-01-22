"use client";

import './page.scss';

export default function Legal() {
    const handleOpenCookieModal = () => {
        window.dispatchEvent(new CustomEvent('openCookieModal', { detail: { mode: 'manage' } }));
    };
    return (
        <main className="legal">
            <section>
                <h2>Mentions légales</h2>
                <h3>1- Présentation du site</h3>
                <p>En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, il est précisé aux utilisateurs du site www.jimmyhub.fr l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
                <p><strong>Propriétaire et créateur :</strong> Jimmy Leschaeve – Email : contact@jimmyhub.fr</p>
                <p><strong>Hébergeur :</strong> Vercel Inc. – 340 S Lemon Ave, Suite 4133, Walnut, CA 91789, USA – Email : support@vercel.com</p>
                <h3>2- Conditions générales d&apos;utilisation du site</h3>
                <p>L&apos;utilisation du site www.jimmyhub.fr implique l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation ci-après décrites. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou complétées à tout moment, les utilisateurs sont donc invités à les consulter régulièrement.</p>
                <p>Le site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être décidée par Jimmy Leschaeve qui s&apos;efforcera de communiquer préalablement aux utilisateurs les dates et heures d&apos;intervention.</p>
                <h3>3- Description des services fournis</h3>
                <p>Le site www.jimmyhub.fr a pour objet de présenter le portfolio et les réalisations de Jimmy Leschaeve, développeur web fullstack.</p>
                <p>Jimmy Leschaeve s&apos;efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour.</p>
                <p>Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d&apos;évoluer. Elles sont données sous réserve de modifications depuis leur mise en ligne.</p>
                <h3>4- Limitations contractuelles sur les données techniques</h3>
                <p>Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du site. L&apos;utilisateur s&apos;engage à accéder au site avec un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.</p>
                <h3>5- Propriété intellectuelle et contrefaçons</h3>
                <p>Jimmy Leschaeve est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage sur tous les éléments accessibles sur le site, notamment textes, images, graphismes, logos et icônes.</p>
                <p>Toute exploitation non autorisée du site ou des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
                <h3>6- Limitations de responsabilité</h3>
                <p>Jimmy Leschaeve ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site.</p>
                <h3>7- Liens hypertextes et cookies</h3>
                <p>Le site peut contenir des liens vers d&apos;autres sites. Jimmy Leschaeve n&apos;a pas la possibilité de vérifier le contenu de ces sites et n&apos;assume aucune responsabilité.</p>
                <p>La navigation peut provoquer l&apos;installation de cookies. Vous pouvez configurer votre navigateur pour refuser les cookies :</p>
                <ul>
                    <li><strong>Internet Explorer :</strong> Onglet Outils (pictogramme en forme de rouage en haut à droite) → Options Internet → Confidentialité → choisir Bloquer tous les cookies → Valider par OK.</li>
                    <li><strong>Microsoft Edge :</strong> Menu (trois points en haut à droite) → Paramètres → Cookies et autorisations de site → Gérer et supprimer les cookies et données du site → Bloquer tous les cookies.</li>
                    <li><strong>Firefox :</strong> Menu Firefox → Paramètres → Vie privée et sécurité → Historique → Utiliser les paramètres personnalisés pour l&apos;historique → cocher Bloquer les cookies.</li>
                    <li><strong>Safari :</strong> Menu Safari → Préférences → Confidentialité → Cookies et données de sites → Bloquer tous les cookies.</li>
                    <li><strong>Chrome :</strong> Menu Chrome (trois points en haut à droite) → Paramètres → Confidentialité et sécurité → Cookies et autres données de site → Bloquer tous les cookies.</li>
                </ul>
                <h3>8- Droit applicable et attribution de juridiction</h3>
                <p>Tout litige en relation avec l&apos;utilisation du site est soumis au droit français. Attribution exclusive de juridiction aux tribunaux compétents.</p>
                <h3>9- Les principales lois concernées</h3>
                <ul>
                    <li>Loi n° 78-17 du 6 janvier 1978, modifiée par la loi n° 2004-801 du 6 août 2004 relative à l&apos;informatique et aux libertés.</li>
                    <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</li>
                    <li>Règlement européen n° 2016/679 (RGPD).</li>
                </ul>
                <h3>10- Lexique</h3>
                <p><strong>Utilisateur :</strong> Internaute se connectant, utilisant le site.</p>
                <p><strong>Informations personnelles :</strong> « Les informations qui permettent, directement ou indirectement, l&apos;identification des personnes physiques auxquelles elles s&apos;appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>
            </section>
            <section>
                <h2>Politique de confidentialité</h2>
                <h3>1- Collecte des renseignements personnels</h3>
                <p>Ce site ne collecte aucune information personnelle via des formulaires. Aucune inscription n&apos;est requise pour naviguer sur le site.</p>
                <h3>2- Données de navigation</h3>
                <p>Les données de navigation sont collectées via Vercel Analytics et Speed Insights à des fins statistiques anonymes. Ces outils permettent d&apos;analyser la fréquentation du site sans identifier personnellement les visiteurs.</p>
                <h4>2.1- Droit d&apos;opposition et de retrait</h4>
                <p>Vous pouvez vous opposer à la collecte de données de navigation en refusant les cookies analytiques via le gestionnaire de cookies disponible en bas de cette page.</p>
                <h4>2.2- Sécurité</h4>
                <p>Les informations sont conservées dans un environnement sécurisé chez Vercel. Pour garantir cette sécurité, le site utilise un protocole SSL. Aucune information personnelle n&apos;est cédée ou vendue à des tiers.</p>
                <h3>3- Législation</h3>
                <p>Le site respecte les dispositions législatives du RGPD et des lois françaises relatives aux données personnelles.</p>
            </section>
            <section>
                <h2>Information concernant les cookies</h2>
                <h3>Qu&apos;est-ce qu&apos;un cookie ?</h3>
                <p>La Commission Nationale de l&apos;Informatique et des Libertés (CNIL) définit un cookie comme « une information déposée sur votre disque dur par le serveur du site que vous visitez ». Il contient le nom du serveur qui l&apos;a déposé, un identifiant unique et éventuellement une date d&apos;expiration. Ces informations sont stockées sur votre ordinateur dans un simple fichier texte auquel le serveur peut accéder pour lire ou enregistrer des informations.</p>
                <h3>À quoi servent les cookies ?</h3>
                <p>Les cookies permettent de reconnaître un internaute d&apos;une visite à l&apos;autre grâce à un identifiant unique. Ils peuvent également être utilisés pour stocker le contenu d&apos;un panier d&apos;achat, enregistrer les paramètres de langue d&apos;un site, faire de la publicité ciblée ou mesurer l&apos;audience du site.</p>
                <h3>Quels cookies utilise le site www.jimmyhub.fr et comment les gérer ?</h3>
                <p>Le site utilise uniquement des cookies liés aux statistiques de visites fournies par Vercel Analytics et Speed Insights. Ces cookies ne permettent pas d&apos;identifier personnellement les visiteurs et ne sont utilisés ni pour de la publicité, ni pour le suivi comportemental.</p>
                <p>Vous pouvez accepter ou refuser les cookies en configurant votre navigateur. Il est possible de choisir d&apos;accepter ou de rejeter les cookies systématiquement ou selon leur émetteur, et de recevoir une notification avant qu&apos;un cookie soit enregistré. Les instructions pour configurer ces choix sont disponibles dans le menu d&apos;aide de votre navigateur.</p>
                <h3>Durée de validité de votre accord</h3>
                <p>Votre accord concernant le dépôt des cookies de mesure d&apos;audience Vercel Analytics est valable 13 mois. Passé ce délai, un bandeau vous informant de l&apos;utilisation de ces cookies et vous permettant de vous y opposer réapparaîtra sur la page d&apos;accueil. Vous pouvez également vous opposer au dépôt de ces cookies à tout moment via le bouton ci-dessous.</p>
            </section>
            <button onClick={handleOpenCookieModal} className="button">
                Gérer mes cookies
            </button>
        </main>
    );
}