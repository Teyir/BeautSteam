exports.run = (client, message, args) => {

    //Liste des blagues

    const blagues = [
        "Il y a 10 types de gens dans le monde.\n"+
        "Ceux qui parlent binaire, et les autres.",

        "Toc Toc\n" +
        "Qui est là ?\n" +
        "*Très longue pause*\n" +
        "C'est Java (marche aussi avec Internet Explorer)",

        "Comment un développeur tente-t-il de réparer sa voiture lorsqu'elle a un problème ?\n" +
        "Il sort de la voiture, ferme toutes les fenêtres, retourne dans la voiture, et essaie de redémarrer.",

        "Combien de développeurs faut-t-il pour remplacer une ampoule grillée ?\n" +
        "Aucun, c'est un problème Hardware.",

        "Une requête TCP entre dans un bar et dit :\n" +
        "- Je veux une bière\n" +
        "- Vous voulez une bière ?\n" +
        "- Oui, je veux une bière\n" +
        "- Très bien",

        "Comment reconnaître un programmeur avec un verre vide ?\n" +
        "- Le pessimiste dit que le verre est à moitié vide\n" +
        "- L'optimiste dit que le verre est à moitié plein\n" +
        "- Le programmeur dit que le verre est deux fois trop grand",

        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?\n" +
        "Vous connaissez la blague du mec qui a oublié d'augmenter la variable dans sa boucle while ?",

        "L'amour est dans le <pre>",

        "Quand je suis content je commit",

        "Pour être à jour il faut se mettre à l'apache",

        "Pourquoi ne doit-on jamais passer en paramètre d'une allocution dynamique en C, une variable nommée 'u' ?\n" +
        "\n" +
        "=> Parce que ça fait mal au cul... (malloc(u))",

        "Si Microsoft inventait un truc qui plante pas, ce serait un clou",


    ];

    message.channel.send(blagues[Math.floor(Math.random() * blagues.length)]).catch(console.error);
}