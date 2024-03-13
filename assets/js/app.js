$(function () {
    const searchForm = $("#searchForm");
    const superheroInfo = $("#superheroInfo");
    const chartContainer = $("#chartContainer");

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
            success: function (superhero) {
                // mostrar info en la consola
                console.dir(superhero);

                // Verificar si la respuesta indica éxito
                if (superhero.response === "success") {

                    // Crear una card con toda la información del superhéroe
                    let cardHtml = '<div class="card">';
                    cardHtml += `<img src="${superhero.image.url}" class="card-img-top" alt="${superhero.name}">`;
                    cardHtml += '<div class="card-body">';
                    cardHtml += `<h5 class="card-title">${superhero.name}</h5>`;
                    cardHtml += '<p class="card-text"><strong>Powerstats:</strong></p>';
                    cardHtml += '<ul>';

                    // Recorrer powerstats y agregar a la card
                    Object.entries(superhero.powerstats).forEach(([key, value]) => {
                        cardHtml += `<li>${key}: ${value}</li>`;
                    });

                    cardHtml += '</ul>';
                    cardHtml += '<p class="card-text"><strong>Biography:</strong></p>';
                    cardHtml += '<ul>';

                    // Recorrer biography y agregar a la card
                    Object.entries(superhero.biography).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            cardHtml += `<li>${key}: ${value.join(', ')}</li>`;
                        } else {
                            cardHtml += `<li>${key}: ${value}</li>`;
                        }
                    });

                    cardHtml += '</ul>';
                    cardHtml += '<p class="card-text"><strong>Appearance:</strong></p>';
                    cardHtml += '<ul>';

                    // Recorrer appearance y agregar a la card
                    Object.entries(superhero.appearance).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            cardHtml += `<li>${key}: ${value.join(', ')}</li>`;
                        } else {
                            cardHtml += `<li>${key}: ${value}</li>`;
                        }
                    });

                    cardHtml += '</ul>';
                    cardHtml += '<p class="card-text"><strong>Work:</strong></p>';
                    cardHtml += '<ul>';

                    // Recorrer work y agregar a la card
                    Object.entries(superhero.work).forEach(([key, value]) => {
                        cardHtml += `<li>${key}: ${value}</li>`;
                    });

                    cardHtml += '</ul>';
                    cardHtml += '<p class="card-text"><strong>Connections:</strong></p>';
                    cardHtml += '<ul>';

                    // Recorrer connections y agregar a la card
                    Object.entries(superhero.connections).forEach(([key, value]) => {
                        cardHtml += `<li>${key}: ${value}</li>`;
                    });

                    cardHtml += '</ul>';
                    cardHtml += '</div>';
                    cardHtml += '</div>';

                    // Mostrar la card en el contenedor
                    superheroInfo.html(cardHtml);

                    // Gráfico canvas
                    const options = {
                        title: {
                            text: `Estadisticas de poder para ${superhero.name}`
                        },
                        animationEnabled: true,
                        data: [{
                            type: "pie",
                            startAngle: 40,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: []
                        }]
                    };

                    // Recorrer powerstats para agregar datos al gráfico
                    Object.entries(superhero.powerstats).forEach(([key, value]) => {
                        options.data[0].dataPoints.push({ y: value, label: key });
                    });

                    chartContainer.CanvasJSChart(options);

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



