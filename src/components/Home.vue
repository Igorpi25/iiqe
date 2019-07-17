<template>
    <div class="home-container">
        <div class="papers">
            <h2 class="papers__title">IIQE</h2>
            <router-link to="/paper1">
                <div class="paper-item">
                    <h2>Paper 1</h2>
                    <p>Long Term Insurance Examination</p>
                </div>
            </router-link>
            <router-link to="/paper3">
                <div class="paper-item">
                    <h2>Paper 3</h2>
                    <p>Long Term Insurance Examination</p>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
a {
    text-decoration: none;
    color: #000;
}

.home-container {
    max-width: 100vw;
	height: 100vh;
	padding: 20px;	
	background-color: #F5F6FC;

    .papers {
        max-width: 800px;
		margin: auto;
		text-align: left;
		position: relative;

        &__title {
            margin-left: 20px;
            text-align: left;
        }

        .paper-item {
            background-color: #fff;
			box-sizing: border-box;
			padding: 20px;
			padding-right: 30%;
			margin-bottom: 20px;
			border-radius: 16px;
			-webkit-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			-moz-box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);
			box-shadow: 0px 0px 8px 0px rgba(50,132,229,0.16);

			@media (max-width: 768px) {
				padding-right: 10px;
				font-size: 0.85rem;
			}
		
        }
    }
}
</style>
