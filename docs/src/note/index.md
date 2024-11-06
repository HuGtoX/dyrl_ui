---
prev: false
next: false
---

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios'
const list = ref([])
onMounted(async () => { 
    const data = await axios('https://whyta.cn/api/tx/bulletin?key=cc8cba0a7069')
    console.log('data',data.json())
 })

</script>

Todo:

- Daily notes
