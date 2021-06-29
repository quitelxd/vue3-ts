<template>
    <div>
        home111
        <router-view/>
    </div>
</template>
<script lang="ts">
    import {defineComponent} from 'vue';

    interface Person {
        name: string;
        age: number;
    }

    export default defineComponent({
        name: 'Home',
        setup: function () {

            let personProps: keyof Person = "age";
            console.log(personProps);


            // function toLength(konw: string | number): number {
            //     if ((<string>konw).length) {
            //         console.log((konw as string).length)
            //     } else {
            //         console.log(konw.toString().length)
            //     }
            //     return 123
            // }

            return {
                // toLength
            }
        },
        created() {
        },
        components: {}
    });
</script>

<style scoped>

</style>
