<template>
    <div class="home-container" :class="{'home-container--dark': isDarkMode}">
        <div class="papers">
            <div class="header">
                <h3 class="header__title">BERLOGGA-IIQE</h3>
                <div class="header__logo"><img src="../assets/logo.png"></div>
            </div>
            
            <div>
                <div class="toggle-container">
                    <div class="toggle">
                        <p class="toggle__name">Random</p>
                        <toggle-button 
                            class="toggle__button"
                            color="#43B136"
                            :width="75"
                            :height="30" 
                            :font-size="16"
                            :checked="false"
                            :labels="{checked: 'on', unchecked: 'off'}"
                            v-model="isRandom"
                            @change="switchOrder"
                        >
                        </toggle-button>
                    </div>
                    <div class="toggle">
                        <p class="toggle__name">Dark mode</p>
                        <toggle-button 
                            class="toggle__button"
                            color="#43B136"
                            :width="75"
                            :height="30" 
                            :font-size="16"
                            :checked="false"
                            :labels="{checked: 'on', unchecked: 'off'}"
                            v-model="isDarkMode"
                            @change="switchMode"
                        >
                        </toggle-button>
                    </div>
                </div>

                <div class="paper-item" :class="{'paper-item--dark': isDarkMode}">
                    <router-link to="/paper1">
                        <h2>Paper 1</h2>
                        <p>Principles and Practice of Insurance</p>
                    </router-link>
                    <div class="restart" @click="restart('paper1')"><icon-base iconColor="#1A8DFF" width="24" height="24"><icon-refresh /></icon-base></div>
                    <div class="progress">{{ this.progressPaper1 }} / 75</div>
                    <div class="progress-counter">
                        <div class="progress-counter__correct">{{ p1_correct.length }}</div>
                        <div class="progress-counter__wrong">{{ p1_wrong.length }}</div>
                    </div>
                </div>
                <div class="paper-item" :class="{'paper-item--dark': isDarkMode}">
                    <router-link to="/paper3">
                        <h2>Paper 3</h2>
                        <p>Long Term Insurance Examination</p>
                    </router-link>
                    <div class="restart" @click="restart('paper3')"><icon-base iconColor="#1A8DFF" width="24" height="24"><icon-refresh /></icon-base></div>
                    <div class="progress">{{ this.progressPaper3 }} / 50</div>
                    <div class="progress-counter">
                        <div class="progress-counter__correct">{{ p3_correct.length }}</div>
                        <div class="progress-counter__wrong">{{ p3_wrong.length }}</div>
                    </div>
                </div>
            </div>
            <p class="copyright">&copy;Zennnn / All Rights Reserved</p>
        </div>
    </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconRefresh from '@/components/icons/IconRefresh'
import { ToggleButton } from 'vue-js-toggle-button'
export default {
    components: {
        IconBase,
        IconRefresh,
        ToggleButton
    },
    data() {
        return {
            isRandom: JSON.parse(localStorage.getItem('random')) || false,
            isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
            progressPaper1: parseInt(localStorage.getItem('paper_1')) + 1 || 1,
            progressPaper3: parseInt(localStorage.getItem('paper_3')) + 1 || 1,
            p1_correct: JSON.parse(localStorage.getItem('p1_correct')) || [],
            p3_correct: JSON.parse(localStorage.getItem('p3_correct')) || [],
            p1_wrong: JSON.parse(localStorage.getItem('p1_wrong')) || [],
            p3_wrong: JSON.parse(localStorage.getItem('p3_wrong')) || []
        }
    },
    methods: {
        switchOrder() {
            if(this.isRandom) 
                localStorage.setItem('random', JSON.stringify(true))
            else localStorage.setItem('random', JSON.stringify(false))
        },
        switchMode() {
            if(this.isDarkMode) 
                localStorage.setItem('darkMode', JSON.stringify(true))
            else localStorage.setItem('darkMode', JSON.stringify(false))
        },
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
    height: 100vh;
    padding: 20px;	
    background-color: #F5F6FC;
    box-sizing: border-box;

    @media (max-height: 600px) {
        height: 100%;
    }

    .papers {
        max-width: 800px;
        height: 100%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
		text-align: left;
        position: relative;
        overflow-y: hidden;

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

        .toggle-container {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            justify-content: flex-end;
            

            .toggle {
                margin-left: 10px;
               &__name {
                   margin-bottom: 5px;
                   font-size: .9rem;
                   text-align: center;
               }

               .toggle_button {
                user-select: none;
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

			@media (max-height: 768px) {
				//max-height: 150px;
                padding: 10px 20px;
            }
            
            p {
                font-family: 'SFProDisplay-Light', 'sans-serif';
            }

            .restart {
                width: 40px;
                height: 32px;
                margin-top: 30px;
                cursor: pointer;
            }

            .progress {
                position: absolute;
                top: 40px;
                right: 20px;
            }

            .progress-counter {
                width: 40px;
                display: flex;
                justify-content: space-around;
                position: absolute;
                right: 20px;
                bottom: 30px;
                font-weight: bold;

                &__correct {
                    color: #43B136;
                }
                &__wrong {
                    color: #FF4848;
                }
            }
        }
        .paper-item--dark {
            background-color: #333333;
            box-shadow: none;
            
            h2, p {
                color: #F5F6FC;
            }
        }

        .copyright {
            font-family: 'MyriadPro-Regular', 'sans-serif';
            font-size: 1rem;
            max-width: 100%;
            text-align: center;

            @media (max-width: 768px) {
                font-size: 0.75rem;
            }
        }
    } 
}
.home-container--dark {
    background-color: rgb(20, 20, 20);
    color: #F5F6FC
}
</style>
