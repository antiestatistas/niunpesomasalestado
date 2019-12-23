const exampleDataA = [
    {
        id: 1,
        active: true,
        title: 'Celebration A',
        details: `
        <p>Come on, this is a Bluth family celebration. It's no place for children.</p>
        `
    },
    {
        id: 2,
        active: false,
        title: 'Lighter Fluid and Wine A',
        details: `
        <p>But where did the lighter fluid come from? Wine only turns to alcohol if you let it sit. But anyhoo, can you believe that the only reason the club is going under is because it's in a terrifying neighborhood?</p>
        `
    },
    {
        id: 3,
        active: false,
        title: `What's in Oscar's box? A`,
        details: `
        <p>In fact, it was a box of Oscar's legally obtained medical marijuana. Primo bud. Real sticky weed.</p>
        <p>Great, now I'm gonna smell to high heaven like a tuna melt!</p>
        `
    }
]

const exampleDataB = [
    {
        id: 1,
        active: true,
        title: 'Celebration B',
        details: `
        <p>Come on, this is a Bluth family celebration. It's no place for children.</p>
        `
    },
    {
        id: 2,
        active: false,
        title: 'Lighter Fluid and Wine B',
        details: `
        <p>But where did the lighter fluid come from? Wine only turns to alcohol if you let it sit. But anyhoo, can you believe that the only reason the club is going under is because it's in a terrifying neighborhood?</p>
        `
    },
    {
        id: 3,
        active: false,
        title: `What's in Oscar's box? B`,
        details: `
        <p>In fact, it was a box of Oscar's legally obtained medical marijuana. Primo bud. Real sticky weed.</p>
        <p>Great, now I'm gonna smell to high heaven like a tuna melt!</p>
        `
    }
]            

const exampleDataC = [
    {
        id: 1,
        active: true,
        title: 'Celebration C',
        details: `
        <p>Come on, this is a Bluth family celebration. It's no place for children.</p>
        `
    },
    {
        id: 2,
        active: false,
        title: 'Lighter Fluid and Wine C',
        details: `
        <p>But where did the lighter fluid come from? Wine only turns to alcohol if you let it sit. But anyhoo, can you believe that the only reason the club is going under is because it's in a terrifying neighborhood?</p>
        `
    },
    {
        id: 3,
        active: false,
        title: `What's in Oscar's box? C`,
        details: `
        <p>In fact, it was a box of Oscar's legally obtained medical marijuana. Primo bud. Real sticky weed.</p>
        <p>Great, now I'm gonna smell to high heaven like a tuna melt!</p>
        `
    }
]            

Vue.component('accordion', {
    props: {
        content: {
        type: Array,
        required: true
        },
        multiple: {
        type: Boolean,
        default: false
        }
    },
    data() {
        return {
            groupId: null
        }
    },
    template: `
        <dl class="accordion box" role="presentation">
        <accordion-item
            v-for="item in content"
            :multiple="multiple"
            :item="item"
            :groupId="groupId"
            :key="item.id">
        </accordion-item>
        </dl>
    `,
    mounted() {
        this.groupId = this.$el.id
    }
});
Vue.component('accordion-item', {
props: ['item', 'multiple', 'groupId'],
template: `
    <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
    <dt class="accordion-item-title">
        <button @click="toggle" class="accordion-item-trigger">
        <h4 class="accordion-item-title-text">{{item.title}}</h4>
        <span class="accordion-item-trigger-icon"></span>
        </button>
    </dt>
    <transition
        name="accordion-item"
        @enter="startTransition"
        @after-enter="endTransition"
        @before-leave="startTransition"
        @after-leave="endTransition">
        <dd v-if="item.active" class="accordion-item-details">
        <div v-html="item.details" class="accordion-item-details-inner"></div>
        </dd>
    </transition>
    </div>
`,
methods: {
    toggle(event) {
    if (this.multiple) this.item.active = !this.item.active
    else {
        this.$parent.$children.forEach((item, index) => {
        if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
        else item.item.active = false
        }) 
    }
    },
    
    startTransition(el) {
    el.style.height = el.scrollHeight + 'px'
    },
    
    endTransition(el) {
    el.style.height = ''
    }
}
});

Vue.component('tabs', {
    template: `
        <div>
        <ul class="nav nav-tabs" role="tablist">
            <li v-for="tab in tabs" class="nav-item" role="presentation">
            <a :href="'#' + tab.name" @click.prevent="selectTab(tab)" role="tab" class="nav-link" :class="{ 'active': tab.isActive }">{{ tab.text }}</a>
            </li>
        </ul>
        <div class="tab-content">
            <slot name="tabwrap"></slot>
        </div>
        </div>

        `,
    data() {
        return { tabs: [] };
    },
    created() {
        this.tabs = this.$children;
    },
    methods: {
    selectTab(selectedTab) {
        this.tabs.forEach(function(tab){
        tab.isActive = (tab.name == selectedTab.name);
        });
    }
    }
});

Vue.component('tab', {
    template: `
        <div :id="'#' + this.name" role="tabpanel" v-if="isActive">
        <slot name="tabinner"></slot>
        </div>
    `,
    data() {
        return {
        isActive: false
        };
    },
    props: {
        text: { required: true },
        name: { required: true },
        selected: { default: false }
    },
    mounted() {
        if(location.hash != ""){
        const url = location.hash;
        this.isActive = (url == '#' + this.name);
        }else{
        this.isActive = this.selected;
        }
    }
});

var anxo = new Vue({ 
    el: '#v-root',
    data: {
        exampleA: exampleDataA,
        exampleB: exampleDataB,
        exampleC: exampleDataC,
    }
});