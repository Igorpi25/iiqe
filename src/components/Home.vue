<template>
    <div class="home-container">
        <div class="papers">
           <div class="header">
                <h3 class="header__title">BERLOGGA-IIQE</h3>
                <div class="header__logo"><img src="../assets/logo.png"></div>
           </div>
            <div class="paper-item">
                <router-link to="/paper1">
                    <h2>Paper 1</h2>
                    <p>Principles and Practice of Insurance</p>
                </router-link>
                <div class="restart" @click="restart('paper1')">restart</div>
                <div class="progress">{{ this.progressPaper1 }} / 75</div>
            </div>
            <div class="paper-item">
                <router-link to="/paper3">
                    <h2>Paper 3</h2>
                    <p>Long Term Insurance Examination</p>
                </router-link>
                <div class="restart" @click="restart('paper3')">restart</div>
                <div class="progress">{{ this.progressPaper3 }} / 50</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progressPaper1: 0,
            progressPaper3: 0
        }
    },
    mounted() {
        this.progressPaper1 = parseInt(localStorage.getItem('paper_1')) || 0
        this.progressPaper3 = parseInt(localStorage.getItem('paper_3')) || 0
    },
    methods: {
        restart(paperNum) {
            if(paperNum == 'paper1') {
                localStorage.removeItem('paper_1')
                localStorage.removeItem('p1_correct')
                localStorage.removeItem('p1_wrong')
                this.$router.push({path: '/paper1'})
            }
            if(paperNum == 'paper3') {
                localStorage.removeItem('paper_3')
                localStorage.removeItem('p3_correct')
                localStorage.removeItem('p3_wrong')
                this.$router.push({path: '/paper3'})
            }
        }
    }
}
</script>


<style lang="scss">
a {
    text-decoration: none;
    color: #000;

    &:hover {
        color: #43B136;
    }
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

       .header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 30px;

            &__title {
                margin-left: 20px;
                text-align: left;

                @media (max-width: 768px) {
                    font-size: 1rem;
                }
            }

            &__logo {
                width: 100px;
                margin-right: 20px;
                float: right;

                @media (max-width: 768px) {
                    width: 75px;
                }

                img {
                    width: 100%;
                }
            }
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
            position: relative;

			@media (max-width: 768px) {
				padding-right: 10px;
				font-size: 0.85rem;
			}

            .restart {
                margin-top: 30px;
                color: #FF4848;
                cursor: pointer;
            }

            .progress {
                position: absolute;
                top: 40px;
                right: 20px;
            }
        }
    }
}
</style>
