const kafka = require("kafka-node");

const producer = new kafka.Producer(new kafka.KafkaClient({kafkaHost:"localhost:9092"}));

const consumer = new kafka.Consumer(new kafka.KafkaClient({kafkaHost:"localhost:9092"}),[{topic:"test",partition:0}]);

consumer.on("message",(data)=>{
    console.log("Recibi:");
    console.log(data);
    //console.log(JSON.parse(data.value).name);
});

producer.send([{
    topic: 'test',
    messages: [JSON.stringify({name:"luis"})], // multi messages should be a array, single message can be just a string or a KeyedMessage instance,
    partition:0,
    timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
 }],(e,data)=>{
     if(e!=null){
         console.log(e);
     }else{
         console.log(data);
     }
 });