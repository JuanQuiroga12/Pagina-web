document.addEventListener('DOMContentLoaded', () => {
    const totalPointsElement = document.getElementById('totalPoints');
    let totalPoints = parseInt(totalPointsElement.textContent);

    const rewards = document.querySelectorAll('.reward');

    rewards.forEach(reward => {
        const canjearButton = reward.querySelector('.btn-canjear');
        const productPoints = parseInt(reward.getAttribute('data-points'));

        canjearButton.addEventListener('click', () => {
            if (totalPoints >= productPoints) {
                totalPoints -= productPoints;
                totalPointsElement.textContent = totalPoints;

                alert(`Has canjeado ${productPoints} puntos.`);
            } else {
                alert('No tienes suficientes puntos para canjear este producto.');
            }
        });
    });
});
