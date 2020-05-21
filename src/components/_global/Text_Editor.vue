<template>
  <div class="text-editor">
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<div class="menubar">

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.bold() }"
					@click="commands.bold">
					<v-icon :size="iconSize" :color="iconColor.icon">format_bold</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.italic() }"
					@click="commands.italic">
						<v-icon :size="iconSize" :color="iconColor.icon">format_italic</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.strike() }"
					@click="commands.strike">
					<v-icon :size="iconSize" :color="iconColor.icon">strikethrough_s</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.underline() }"
					@click="commands.underline">
					<v-icon :size="iconSize" :color="iconColor.icon">format_underline</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="[{ 'is-active': isActive.code() }]"
					@click="commands.code">
					<v-icon :size="iconSize" :color="iconColor.icon">code</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.paragraph() }"
					@click="commands.paragraph">
					<v-icon :size="iconSize" :color="iconColor.icon">notes</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="[{ 'is-active': isActive.heading({ level: 1 }) }, iconColor.text]"
					@click="commands.heading({ level: 1 })">
					H1
				</button>

				<button
					class="menubar__button"
					:class="[{ 'is-active': isActive.heading({ level: 2 }) }, iconColor.text]"
					@click="commands.heading({ level: 2 })">
					H2
				</button>

				<button
					class="menubar__button"
					:class="[{ 'is-active': isActive.heading({ level: 3 }) }, iconColor.text]"
					@click="commands.heading({ level: 3 })">
					H3
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.bullet_list() }"
					@click="commands.bullet_list">
					<v-icon :size="iconSize" :color="iconColor.icon">format_list_bulleted</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.ordered_list() }"
					@click="commands.ordered_list">
					<v-icon :size="iconSize" :color="iconColor.icon">format_list_numbered</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.blockquote() }"
					@click="commands.blockquote">
					<v-icon :size="iconSize" :color="iconColor.icon">format_quote</v-icon>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.code_block() }"
					@click="commands.code_block">
					<v-icon :size="iconSize" :color="iconColor.icon">code</v-icon>
				</button>

				<button
					class="menubar__button"
					@click="commands.horizontal_rule">
					<v-icon :size="iconSize" :color="iconColor.icon">format_quote</v-icon>
				</button>

				<button
					class="menubar__button"
					@click="commands.undo">
					<v-icon :size="iconSize" :color="iconColor.icon">undo</v-icon>
				</button>

				<button
					class="menubar__button"
					@click="commands.redo">
					<v-icon :size="iconSize" :color="iconColor.icon">redo</v-icon>
				</button>

			</div>
		</editor-menu-bar>

		<editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder
} from 'tiptap-extensions'

export default {
	name: 'text-editor',

	components: {
		'editor-menu-bar': EditorMenuBar,
		'editor-content': EditorContent
	},

	props: {
		value: {
			type: String
		},
		placeholder: {
			type: String,
			required: false,
			default: null
		}
	},

	data: () => ({
		iconSize: 22,
		iconColor: {
			icon: 'grey darken-1',
			text: 'grey--text text--darken-1'
		},
		editor: null
	}),

	mounted () {
		this.editor = new Editor({
			extensions: [
				new Blockquote(),
				new BulletList(),
				new CodeBlock(),
				new HardBreak(),
				new Heading({ levels: [1, 2, 3] }),
				new HorizontalRule(),
				new ListItem(),
				new OrderedList(),
				new TodoItem(),
				new TodoList(),
				new Link(),
				new Bold(),
				new Code(),
				new Italic(),
				new Strike(),
				new Underline(),
				new History(),
				new Placeholder({
					showOnlyCurrent: false,
					emptyNodeText: 'Write something'
				})
			],
			// content: this.value,
			onUpdate: ({ getHTML }) => {
				this.$emit('input', getHTML())
			}
		})
		this.editor.setContent(this.value)
	},

	beforeDestroy () {
		this.editor.destroy()
	},

	watch: {
		value: {
			deep: true,
			handler (val) {
				if (this.editor && val !== this.value) {
					this.editor.setContent(val, true)
				}
			}
		}
	}
}
</script>
