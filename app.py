import threading
from time import time
from kafka import KafkaProducer,KafkaConsumer,TopicPartition


producer = KafkaProducer(bootstrap_servers="localhost:9092")
customer = KafkaConsumer(bootstrap_servers="localhost:9092",auto_offset_reset='earliest')
customer.assign([TopicPartition("test",0)])
def send():
    print("STart send")
    producer.send("test",value=b'{"name":"app"}',partition=0)
    producer.flush()
    producer.send("test",value=b'{"name":"app2"}',partition=0)
    producer.flush()
    producer.close()
def consume():
    print("Start consume")
    for ms in customer:
        print(ms.value)
    print("Salio consume")

t1 = threading.Thread(target=send)
t2 = threading.Thread(target=consume)
t2.start()
t1.start()