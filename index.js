const vm = new Vue({
    el: '#app',
    data: {
        data: null,
        cardOpen: {},
        filter: null
    },
    computed: {
        skills1() {
            const data = this.data['technical-skills']
            const mid = Math.ceil(data.length/2)
            return data.slice(0, mid)
        },
        skills2() {
            const data = this.data['technical-skills']
            const mid = Math.ceil(data.length/2)
            return data.slice(mid)
        }
    },
    mounted() {
        fetch('data.json')
            .then(r => r.json())
            .then(r => this.data = r)
    },
    methods: {
        toggleCard(i) {
            if (this.cardOpen[i] === undefined) this.cardOpen[i] = false;
            this.cardOpen[i] = !this.cardOpen[i];

            if (this.cardOpen[i]) {
                document.getElementById(`card-${i}`).classList.remove('collapsed')
                document.getElementById(`toggle-${i}`).className = 'mdi mdi-chevron-up';
            } else {
                document.getElementById(`card-${i}`).classList.add('collapsed');
                document.getElementById(`toggle-${i}`).className = 'mdi mdi-chevron-down';
            }
            
        },
        isRaised(job) {
            const skillsUsed = job['skills-used'] ? job['skills-used'] : [];
            return skillsUsed.indexOf(this.filter) !== -1; 
        },
        expandall() {
                for(var i=0;i< this.data.experience.list.length;i++){
                    document.getElementById(`card-${i}`).classList.remove('collapsed')
                    document.getElementById(`toggle-${i}`).className = 'mdi mdi-chevron-up';
                }
            },
        collapseall() {
                for(var i=0;i< this.data.experience.list.length;i++){
                    document.getElementById(`card-${i}`).classList.add('collapsed')
                    document.getElementById(`toggle-${i}`).className = 'mdi mdi-chevron-down';
                }
            }
        }
})
