const { createApp } = Vue

  createApp({
    data() {
      return {
        emailsArray: [],
        emailsArrayLength: '',
        ms: 0,
        arrayIsCreated: false,
        inputDisplay: true,
        email: '',
        copyText: '',
      }
    },
    mounted() {
    },
    methods: {
        getEmailsArray() {
            axios
              .get('https://flynn.boolean.careers/exercises/api/random/mail')
              .then(response => (
                this.email = response.data.response,
                /* If the new mail is not included in the array push, else request another mail */
                (!this.emailsArray.includes(this.email)) ? this.emailsArray.push(this.email) : this.getEmailsArray(),
                /* if the length of the array is minor than the desired length request another mail, else the array is created */
                (this.emailsArray.length < this.emailsArrayLength) ? this.getEmailsArray() : this.arrayIsCreated = true))
            
            },
        responseTime() {
            this.ms = 0
            let timer = setInterval(()=> (this.arrayIsCreated != true) ? this.ms++ : (clearInterval(timer), this.loadingDisplay = false), 1)
            },
        copyMail(index) {
            this.copyText = this.emailsArray[index]
            navigator.clipboard.writeText(this.copyText);
          }
      }
  }).mount('#app')
  