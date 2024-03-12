$(function () {
    const searchForm = $("#searchForm");
    const superheroInfo = $("#superheroInfo");

    searchForm.submit(function (e) {
        e.preventDefault();

        const superheroNumber = $("[name='super']").val();

        // Validación que el número del superhéroe sea un número positivo
        if (!/^\d+$/.test(superheroNumber) || superheroNumber <= 0) {
            alert("Ingresa un número de SuperHero válido.");
            return;
        }

        $.ajax({
            url: `https://www.superheroapi.com/api.php/3557040851228665/${superheroNumber}`,
            method: "GET",
            success(superhero) {
                console.dir(superhero);

                // Verificar si la respuesta indica éxito
                if (superhero.response === "success") {

                    // Crear una card con toda la información del superhéroe
                    const cardHtml = `
                            <div class="card">
                                <img src="${superhero.image.url}" class="card-img-top" alt="${superhero.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${superhero.name}</h5>
                                    <p class="card-text"><strong>Powerstats:</strong></p>
                                    <ul>
                                        <li>Intelligence: ${superhero.powerstats.intelligence}</li>
                                        <li>Strength: ${superhero.powerstats.strength}</li>
                                        <li>Speed: ${superhero.powerstats.speed}</li>
                                        <li>Durability: ${superhero.powerstats.durability}</li>
                                        <li>Power: ${superhero.powerstats.power}</li>
                                        <li>Combat: ${superhero.powerstats.combat}</li>
                                    </ul>
                                    <p class="card-text"><strong>Biography:</strong></p>
                                    <ul>
                                        <li>Full Name: ${superhero.biography['full-name']}</li>
                                        <li>Alter Egos: ${superhero.biography['alter-egos']}</li>
                                        <li>Aliases: ${superhero.biography.aliases.join(', ')}</li>
                                        <li>Place of Birth: ${superhero.biography['place-of-birth']}</li>
                                        <li>First Appearance: ${superhero.biography['first-appearance']}</li>
                                        <li>Publisher: ${superhero.biography.publisher}</li>
                                        <li>Alignment: ${superhero.biography.alignment}</li>
                                    </ul>
                                    <p class="card-text"><strong>Appearance:</strong></p>
                                    <ul>
                                        <li>Gender: ${superhero.appearance.gender}</li>
                                        <li>Race: ${superhero.appearance.race}</li>
                                        <li>Height: ${superhero.appearance.height.join(', ')}</li>
                                        <li>Weight: ${superhero.appearance.weight.join(', ')}</li>
                                        <li>Eye Color: ${superhero.appearance['eye-color']}</li>
                                        <li>Hair Color: ${superhero.appearance['hair-color']}</li>
                                    </ul>
                                    <p class="card-text"><strong>Work:</strong></p>
                                    <ul>
                                        <li>Occupation: ${superhero.work.occupation}</li>
                                        <li>Base: ${superhero.work.base}</li>
                                    </ul>
                                    <p class="card-text"><strong>Connections:</strong></p>
                                    <ul>
                                        <li>Group Affiliation: ${superhero.connections['group-affiliation']}</li>
                                        <li>Relatives: ${superhero.connections.relatives}</li>
                                    </ul>
                                </div>
                            </div>
                        `;

                    // Mostrar la card en el contenedor
                    superheroInfo.html(cardHtml);
                } else {
                    // Mostrar mensaje de error si la respuesta no es éxito
                    alert("No se encontró el SuperHero. Ingresa un número válido.");
                }
            },
            error(errorSh) {
                console.log(errorSh);

                // Mostrar mensaje de error
                alert("Error al buscar el SuperHero. Inténtalo de nuevo más tarde.");
            },
        });
    });
});

