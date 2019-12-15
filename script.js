new Vue({
	el: "#app",
	data: {
		addtype: "",
		agendaTxt: "",
		agendaList:[{
			key:"",
			val:""
		}],
		agendaTime: ["",""],
		isSet:true,
		setIndex:0,
		banner: "https://www.solarbe.com/special/2019guangnengbei/img/banner.png",
		mbanner: "https://www.solarbe.com/special/2019guangnengbei/img/mbanner.png",
		agenda: []
	},
	methods: {
		openWin(url){
			url && window.open(url)
		},
		initAddObj(){
			this.agendaTxt = ""
			this.addtype = ""
			this.setIndex = 0
			for(let i=0,len=this.agendaList.length;i<len;i++){
				this.agendaList[i].val = ""
			}
		},
		addItem(type, push) {
			this.addtype = type
			if(!type){
				this.initAddObj()
				return
			}
			if (!push) {
				return
			}
			if(type=='addpdf'){
				this.agenda[this.setIndex].pdf = this.agendaTxt
				this.initAddObj()
				return
			}
			let data = {
				type,
				content: this.agendaTxt
			}
			if (type == 'content') {
				if (!this.agendaTime[0]) {
					alert("时间不能为空")
					return 
				}
				data.time = this.agendaTime.join("-")
				if(!this.agendaTime[1]){
					data.time = this.agendaTime[0]
				}
				data.content = this.agendaList
			}

			if (!data.content) {
				alert("内容不能为空")
				return
			}
			if(this.setIndex){
				this.agenda[this.setIndex] && (this.agenda[this.setIndex] = JSON.parse(JSON.stringify(data)))
			}else{
				this.agenda.push(JSON.parse(JSON.stringify(data)))
				this.agendaTime[0] = this.agendaTime[1]
				this.agendaTime[1] = ""
			}
			this.initAddObj()
		},
		addVal() {
			this.agendaList.push({
				key: "",
				val: ""
			})
		},
		setItem(index){
			this.setIndex = index
			let obj = JSON.parse(JSON.stringify(this.agenda[index]))
			this.agendaTxt = obj.content
			if(obj.type == 'content'){
				this.agendaTime = obj.time.split("-")
				if(this.agendaTime.length==1){
					this.agendaTime[1] = ""
				}
				this.agendaList = obj.content
			}
			this.addItem(obj.type)
		},
		addPdf(index){
			this.setIndex = index
			this.addItem('addpdf')
		},
		setPosition(type,index){
			if(type == 'top' && index-1 >= 0){
				let thisObj = JSON.parse(JSON.stringify(this.agenda[index]))
				this.agenda[index] = JSON.parse(JSON.stringify(this.agenda[index-1]))
				this.agenda[index-1] = thisObj
				this.$forceUpdate()
			}
			if(type == 'bottom' && index < this.agenda.length){
				let thisObj = JSON.parse(JSON.stringify(this.agenda[index]))
				this.agenda[index] = JSON.parse(JSON.stringify(this.agenda[index+1]))
				this.agenda[index+1] = thisObj
				this.$forceUpdate()
			}
		}
	}
})
