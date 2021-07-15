<template>
  <div class="about">
    <app-bar />
    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
    <v-card
    class="mx-auto "
  >
   <v-container class="py-16 px-16" fluid>
     <h1 class="text-center py-8 ">Gestion des apprenants</h1>
  Ce projet de système de gestion des apprenants est une application basée sur le web et développée sur PHP OOP et MySQL en backend et vue js comme framework de frontend, il gère toutes les informations sur les apprenants et les classes. Les principaux modules du projet sont Apprenant, qui effectue toutes les opérations liées à l'apprenant comme l'ajout de nouveau apprenant, modifier l'existant, la recherche et la suppression de l'apprenant. Module de Classe, qui effectue toutes les opérations liées à la classe telles que l'ajout d'une nouvelle classe , la modification d'une classe existante, la recherche d'une classe et la suppression d'une classe.
      </v-container>
    </v-card>

    <Footer-app />
  </div>
</template>
<script>
import appBar from '../components/appBar.vue';
import FooterApp from '../components/FooterApp.vue';

export default {
    components: { appBar,FooterApp},
data () {
      return {
        items: [
          {
            src: 'https://th.bing.com/th/id/R4a73dc9015710776180594c7bdc9cc77?rik=gq%2bBcTNh8CaYWQ&pid=ImgRaw',
          },
          {
            src: 'https://th.bing.com/th/id/Rd213c2948975204048a45c32efb75cad?rik=XGoOxcfIJutPQw&pid=ImgRaw',
          },
          {
            src: 'https://www.leconomiste.com/sites/default/files/eco7/public/youcode-ph-fan-2.jpg',
          },
          {
            src: 'https://th.bing.com/th/id/Rb453cc55633428515bf89efff95ca223?rik=TrHfWWV1%2fXlKUQ&pid=ImgRaw',
          },
        ],
      }
    },
}
</script>
