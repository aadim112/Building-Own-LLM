// App.js — InsideLLMs documentation site
// This file shows you EXACTLY how to use every component.
// The pattern for every new topic:
//   1. Add an entry to NAV_ITEMS (for the sidebar)
//   2. Drop a <SectionAnchor id="your-id" /> where the section starts
//   3. Fill with TextSection, ImageBlock, CodeSnippet, Callout, DiagramSection

import './App.css'
import '../src/Styles/components.css';

// ── Layout components (always present) ──────────────────────────
import Sidebar from './Components/Sidebar';

// ── Content building blocks ──────────────────────────────────────
import SectionAnchor  from './Components/SectionAnchor'
import TextSection    from './Components/TextSection';
import ImageBlock     from './Components/ImageBlock';
import CodeSnippet    from './Components/CodeSnippet';
import Callout        from './Components/Callout';
import DiagramSection from './Components/DiagramSection';
// import StickyNote from './Components/StickyNote';
import StickyNotesRail from './Components/StickyNotesRail';
import { SectionTrackerProvider } from './Components/SectionTrackerContext';
import OutputBlock from './Components/OutputBlock';

// ── Interactive diagrams (you'll add more as you go) ─────────────
import AttentionScoreDiagram from './diagrams/AttentionScoreDiagram';
import AttentionWeightsDiagram from './diagrams/AttentionWeightsDiagram';
import LLMBuildingStagesDiagram from './diagrams/LLMBuildingStagesDiagram';
import LLMCapabilitiesDiagram  from './diagrams/LLMCapabilitiesDiagram';

// ── Optional: images ─────────────────────────────────────────────
import attentionImg from './assets/attentionImg.png';
import hierarchy from './assets/hierarchy.png'
import transformerarchi from './assets/transformerarchi.png'
import bertgpt from './assets/bertgpt.png'
import stages from './assets/stages.png'
import datasetgpt3 from './assets/datasetgpt3.png';
import gptarchitecture from './assets/gptarchitecture.png';
import LLMStages from './assets/LLM Stages.png'
import dimensions from './assets/dimensions.png'
import tokenization from './assets/tokenization.png'
// ════════════════════════════════════════════════════════════════
// NAVIGATION — add / reorder entries here freely
// Each { label, id } matches a <SectionAnchor id="..." /> below
// ════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { label: "Welcome",   id: "intro",
    children: [{ label: "Understanding LLMs", id: "intro"},{ label: "Stages of Building LLMs", id: "stages" },{ label: "Transformer Architecture", id: "transArchi"},{label: "About GPT", id:"aboutgpt", children:[{label: "Datasets for GPT-3", id:"datasetcomparison"}]}]
  },
  {label: "Building LLM", id: "LLM", 
    children: [
      {label: "Working with text data", id: "cha2",
        children:[
          {label:"Tokenization", id:"tokenization"}
        ]
      }
    ]
  },
  {
    label: "Attention",      id: "attention",
    children: [
      { label: "Intuition",  id: "attention-intuition" },
      { label: "Math",       id: "attention-math" },
      { label: "Code",       id: "attention-code" },
    ],
  },
];

function Content() {
  return (
    <>
      {/* ── Introduction ──────────────────────────────────────── */}
      <SectionAnchor id="intro"/>
      <TextSection title="Welcome to InsideLLMs" level={1} titleFont="montserrat" font="poppins"/>
      <p>Welcome </p>
      <TextSection title="Understanding LLM" level={2} titleFont="montserrat" font="poppins">
        <ImageBlock src={hierarchy} alt="" caption="Hierarchical Depiction of LLM" width='80%'></ImageBlock>
        <p>
          An LLM is a neural network designed to understand, generate, and respond to humanlike text. 
          These models are deep neural networks trained on massive amounts of text
          data, sometimes encompassing large portions of the entire publicly available text on
          the internet.
        </p>
        <p>
          Models like this often have tens or even hundreds of billions of parameters, which are the adjustable weights in
          the network that are optimized during training to predict the next word in a sequence.
        </p>
        <p>
          LLMs utilize an architecture called the <span className='highlight'>transformer</span>, which allows them to pay selective attention to different parts of 
          the input when making predictions, making them
          especially adept at handling the nuances and complexities of human language. 
        </p>
      </TextSection>


      <SectionAnchor id="stages"></SectionAnchor>
      <TextSection level={2} titleFont="montserrat" font='poppins' title="Stages of Building and Using LLMs">
        <Callout type='Note' title="What Research Say!">
          Research has shown that when it comes to modeling performance, custom-built LLMs—those tailored for specific tasks or domains—can outperform general-purpose LLMs, such as those provided by ChatGPT, which are designed for a wide array of applications
        </Callout>
        <ImageBlock src={stages} alt="" caption="Pretraining and Fine-Tunning of LLMs" width='80%'></ImageBlock>
        <p>The first step in creating an LLM is to train it on a large corpus of text data, sometimes referred to as raw text.</p>
        <p>The general process of creating an LLM includes pretraining and fine-tuning. The “pre” in “pretraining” refers to the initial phase where a model like an LLM is trained on a large, diverse dataset to develop a broad understanding of language. This pretrained model then serves as a foundational resource that can be further refined
          through fine-tuning, a process where the model is specifically trained on a narrower dataset that is more specific to particular tasks or domains.</p>
        <p>This first training stage of an LLM is also known as <span className='highlight'>pretraining</span>, creating an initial pretrained LLM, often called <span className='highlight'>a base or foundation model</span>. </p>
        <p>After obtaining a pretrained LLM from training on large text datasets, where the LLM is trained to predict the next word in the text, we can further train the LLM on labeled data, also known as <span className='highlight'>fine-tuning.</span></p>
        <p>The two most popular categories of fine-tuning LLMs are <span className='highlight'>instruction fine-tuning</span> and <span className='highlight'>classification fine-tuning</span>. </p>
        <p><span className='highlight-purple'>1. Instruction Fine-tuning :</span> The labeled dataset consists of instruction and answer pairs, such as a query to translate a text accompanied by the correctly translated text. </p>
        <p><span className='highlight-purple'>2. Classification Fine-tuning :</span> The labeled dataset consists of texts and associated class labels—for example, emails associated with “spam” and “not spam” labels.</p>
      </TextSection>

      <SectionAnchor id="transArchi"></SectionAnchor>
      <TextSection title="Transformer Architecture" level={2} titleFont="montserrat" font="poppins">
        <ImageBlock src={transformerarchi} alt="" caption="Simplified Architecture of Transformer" width='70%'></ImageBlock>
        <p>
          Most modern LLMs rely on the transformer architecture, which is a deep neural network architecture introduced in the 2017 paper <span className='highlight'>“Attention Is All You Need”.</span> 
        </p>
        <p>The transformer architecture consists of two submodules: <span className='highlight'>An Encoder and A Decoder</span>.</p>
        <p><span className='highlight-purple'>Encoder :</span> The encoder module processes the input text and encodes it into a series of numerical representations or vectors that capture the contextual information of the input. </p>
        <p><span className='highlight-purple'>Decoder :</span> The decoder module takes these encoded vectors and generates the output text. In a translation task, for example, the encoder would encode the text from the source language into vectors, and the decoder would decode these vectors to generate text in the target language.</p>
        <p>Both the encoder and decoder consist of many layers connected by a so-called self-attention mechanism.</p>
        <p><span className='highlight-purple'>Self-Attention :</span> A key component of transformers and LLMs is the self-attention mechanism, which allows the model to weigh the importance of different words or tokens
          in a sequence relative to each other. This mechanism enables the model to capture
          long-range dependencies and contextual relationships within the input data, enhancing its ability to generate coherent and contextually relevant output.
        </p>
        <p>Later variants of the transformer architecture, such as <span className='highlight'>BERT (short for bidirectional encoder representations from transformers) and the various GPT models (short for generative pretrained transformers)</span>, built on this concept to adapt this architecture for different tasks.</p>
        <ImageBlock src={bertgpt} width='80%'caption="Transformer Architecture of BERT and GPT"></ImageBlock>
        <p>BERT, which is built upon the original transformer's encoder submodule, differs in its training approach from GPT. While GPT is designed for generative tasks, BERT and its variants specialize in masked word prediction, where the model predicts masked or hidden words in a given sentence.</p>
      </TextSection>

      <SectionAnchor id="aboutgpt"></SectionAnchor>
      <TextSection title="Know About GPT" fontFamily="montserrat" font="poppins" level={2}>
        <DiagramSection title="Text Completion vs Zero-shot vs Few-shot">
          <LLMCapabilitiesDiagram />
        </DiagramSection>
        <p>GPT models, primarily designed and trained to perform text completion tasks, also show remarkable versatility in their capabilities. These models are adept at executing both <span className='highlight'>zero-shot and few-shot learning tasks. </span></p>
        <p><span className='highlight-purple'>1. Zero-Shot Learning :</span> A Learning which refers to the ability to generalize to completely unseen tasks without any prior specific examples. </p>
        <p><span className='highlight-purple'>2. Few-Shot Learning :</span> A Learning involves learning from a minimal number of examples the user provides as input. </p>
      </TextSection>
      <SectionAnchor id="datasetcomparison"></SectionAnchor>
      <TextSection title="Datasets Used for GPT-3 Training" level={3} fontFamily="montserrat" font='poppins'>
        <p>The large training datasets for popular GPT- and BERT-like models represent diverse and comprehensive text corpora encompassing billions of words, which include a vast array of topics and natural and computer languages. </p>
        <ImageBlock src={datasetgpt3} alt="" caption="Table 1.1 Datasets used for GPT-3"></ImageBlock>
        <p>Table 1.1 displays the dataset used for GPT-3. The proportions column in the table sums up to 100% of the sampled data, adjusted for rounding errors. Although the subsets in the Number of Tokens column total 499 billion, the model was trained on only 300 billion tokens. The authors of the GPT-3 paper did not specify why the model was not trained on all 499 billion tokens.</p>
        <p><span className='highlight'>The next-word prediction task is a form of self-supervised learning, which is a form of
        self-labeling. This means that we don't need to collect labels for the training data
        explicitly but can use the structure of the data itself: we can use the next word in a sentence or document as the label that the model is supposed to predict.</span></p>
        <p><span className='highlight'>ChatGPT is decoder oriented & Bert is Encoder Oriented.</span></p>
        <p><span className='highlight'>Encoder Oriented Models can look at the word on both left and right side simultaneously.</span></p>
        <p><span className='highlight'>Decoder Oriented Models each token can look are earlier token (left context duting generation).</span></p>
        <p>Models like GPT generate text by predicting text one word at a time, they are considered a type of <span className='highlight'>Autoregressive model</span>.</p>
        <ImageBlock src={gptarchitecture} width='80%' caption="A Simple Architecture of GPT"></ImageBlock>
        <p>The GPT architecture employs only the decoder portion of the original transformer. It is designed for unidirectional, left-to-right processing, making it well suited for text generation and next-word prediction tasks to generate text in an iterative fashion, one word at a time.</p>
      </TextSection>

      <SectionAnchor id="LLM"></SectionAnchor>
        <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Lobster',fontSize:'35px',color:'black', textDecoration:'underline'}}>Large Language Models</div>
        <ImageBlock src={LLMStages} caption="" alt="" width='80%'></ImageBlock>
      <SectionAnchor id="cha2"></SectionAnchor>
        <TextSection title="Working With Text Data" level={1} fontFamily="montserrat" font='poppins'>
          <ImageBlock src={tokenization} alt="" caption="Visualization of Dimensions of word of 3 dimensions"></ImageBlock>
          <p>This involves splitting text into individual word and subword tokens, which can then be encoded into vector representations for the LLM. </p>
          <p>Deep neural network models, including LLMs, cannot process raw text directly. Since text is categorical, it isn't compatible with the mathematical operations used 
            to implement and train neural networks. Therefore, we need a way to represent words as continuous-valued vectors.</p>
          <p>The concept of converting textual data into vector format is often referred to as <span className='highlight'>embedding</span>. Using a specific neural network layer or another pretrained neural network model, we can embed different data types-for example video, audio and text.</p>
          <p>Apart from this neural network there are several algorithms and framework have been developed to generate word embedings. One of the earlier and most popular examples are <span className='highlight'>Word2Vec</span> approach. Word2Vec is trained neural network architecture to generate word embeddings by predicting the context of a word given the target word or vice versa.</p>
          <Callout type='tip' title="What Exactly Word2Vec is?">
            <p>The embeddings learned by Word2Vec are static embeddings, meaning a word always has the same vector regardless of the sentence. This embeddings are formed after training certain neural network on <span className='highlight'>50,000 words</span> and the <span className='highlight'>demension of one word embedding is 300</span>. i.e A word from Word2Vec is represented in array containing 300 values.</p>
          </Callout>
          <Callout type='math' title="More About GPT!">
            <p>The smallest GPT-2 models(117M and 125M parameters) use embedding size of <span className='highlight'>176 dimensions</span>. The largest GPT-3 model (178B parameters) uses an embedding size of <span className='highlight'>12,288 dimensions.</span></p>
          </Callout>
        </TextSection>
        <SectionAnchor id="tokenization"></SectionAnchor>
        <TextSection level={2} title="Tokenizing Text" fontFamily="montserrat" font='poppins'>
          <p>Tokenizing Text involves spitting text into individual words or special character, including punctuation characters.</p>
          <span className='highlight'>To perform tokenization we will currently use vedict.txt file from the following link: </span>
          <a href=''>Download Verdict.txt from here</a>
          <p>Let's Check verdict.txt file using python.</p>
          <CodeSnippet language='PY' title="Checking Verdict.txt">
            {`

with open('verdict.txt', 'r') as file:
    verdict = file.read().strip()
print("The length of the verdict is:", len(verdict))
print(verdict[:100])
            `}
          </CodeSnippet>
          <OutputBlock>
            {`
            The length of the verdict is: 20479
I HAD always thought Jack Gisburn rather a cheap genius--though a good fellow enough--so it was no g
            `}
          </OutputBlock>
          <p>By the output we get to know that there are 20,479 characters in verdict.txt file and first 100 words are outputed.</p>

          <p>Further we split this text so we get an collection of individual words, special characters etc. </p>
          <CodeSnippet language='PY' title="Splitting Text">
            {`
import re
text = re.verdict.split(r'(\s), text)
print(text[:10])
            `}
          </CodeSnippet>
          <p>We have splitted the complete verdict into using <snap className="highlight">re library</snap>. The output has first 10 elements of the collection.</p>
          <OutputBlock>
            {`
['Hello', '', 'world','','This','','is','','a','']
            `}
          </OutputBlock>
          <p>The output consist of words and whitespaces too.</p>
          <Callout type='tip' title="When to keep white spaces">
            We can include the whitespaces as a token and further convert into embedding when there is importance of whitespace in the ouptput of the LLM. Example: Developing LLM to code there is importance of whitespaces for indentation in python. 
            For simple text generation we can add space after every word generated by the LLM.
          </Callout>
        </TextSection>
        <SectionAnchor id="numbertoken"></SectionAnchor>
        <TextSection level={3} title="Converting tokens into tokenID" fontFamily="montserrat" font='poppins'>
          <p>We will convert the tokens into tokenID. This can be done by two ways.</p>
          <p><span className='highlight'>By Creating Vocab :</span> In this processes we have our own words which are mapped to numbers and we use this vocab to convert the required words to number/IDs.</p>
          <p><span className='highlight'>Using Existing Vocab :</span> This is pre-build vocab which we can use to find the ids of the required word.</p>
          <p>Tokenizing text is no big deal it's simply like searching a dictionary which has words and there respective IDs. And this dictionary can be used to find the ID of each Word or Word for each ID.</p>
          <p>Creating own tokenizer it's preferable to use pre-build libraries. Since bulding own tokenizer will consume time and resourses. Also tokenizer created on niche data ofther performs poorly on standard, everyday text.</p>
          <p>Sometimes for tokenizer some words can be new and hence it won't have exact Id for that word. In this case tokernizer uses Special context token such as <span className='highlight'>{"<|unk|>"}</span>.</p>
          <p>Also Tokenizer can have such special tokens to indicate end of line eg: <span className='highlight'>{"<|endoftext|>"}</span>.</p>
          <p><span className='highlight'>Creating Custom Tokenizer</span></p>
          <CodeSnippet language='PY' title="Custom Tokenizer">
            {`

            `}
          </CodeSnippet>
          <OutputBlock>
          </OutputBlock>
          <p>GPT Models do not use standard tokenizer, rather they use something called <span className='highlight'>Byte-Pair Tokenization</span>.</p>
        </TextSection>








      {/* ── Foundations ───────────────────────────────────────── */}
      <SectionAnchor id="foundations" />
      <TextSection title="Foundations" level={2} />

      <SectionAnchor id="tokens" />
      <TextSection title="Tokens" level={3}>
        <p>
          An LLM never reads raw text — it reads <em>tokens</em>. A token is a chunk of text,
          roughly 3-4 characters on average in English. The vocabulary size is fixed at training
          time (GPT-2 uses 50,257 tokens).
        </p>
      </TextSection>

      <CodeSnippet language="python" title="Tokenising a sentence with tiktoken">
{`import tiktoken

enc = tiktoken.get_encoding("cl100k_base")   # GPT-4 tokeniser
tokens = enc.encode("Your journey starts with one step.")
print(tokens)
# → [7927, 11879, 8638, 449, 832, 3094, 13]
print([enc.decode([t]) for t in tokens])
# → ['Your', ' journey', ' starts', ' with', ' one', ' step', '.']`}
      </CodeSnippet>

      {/* ── Embeddings ────────────────────────────────────────── */}
      <SectionAnchor id="embeddings" />
      <TextSection title="Embeddings" level={3}>
        <p>
          Each token ID is mapped to a dense vector of numbers (the embedding). These vectors
          live in a high-dimensional space where semantically similar tokens are geometrically close.
        </p>
      </TextSection>

      <Callout type="math" title="Embedding lookup">
        Given vocabulary size V and embedding dimension d, the embedding matrix E ∈ ℝ<sup>V×d</sup>.
        Token i maps to row E[i].
      </Callout>

      {/* ── Attention ─────────────────────────────────────────── */}
      <SectionAnchor id="attention" />
      <TextSection title="Attention" level={2}>
        <p>
          The attention mechanism lets every token "look at" every other token and decide
          how much to borrow from it. It is the core of the Transformer.
        </p>
      </TextSection>

      <SectionAnchor id="attention-intuition" />
      <TextSection title="Intuition" level={3}>
        <p>
          Imagine reading the word <em>"bank"</em>. To understand it, you look back at
          surrounding words — "river" pulls your attention one way, "loan" another.
          Attention formalises this: each token produces a query (what am I looking for?)
          and keys (what do I offer?). The dot product scores how well a key matches a query.
        </p>
      </TextSection>

      {/* ── Interactive Diagram ───────────────────────────────── */}
      <DiagramSection
        title="Interactive: Attention Scores"
        caption="Click any token above to set it as the query. Bars show ω_ij (raw dot-product scores) for each key token."
      >
        <AttentionScoreDiagram />
      </DiagramSection>

      {/* Swap the line above for an image when you want static: */}
      <ImageBlock src={attentionImg} alt="Attention diagram" caption="Fig 1: Attention scores" />

      <SectionAnchor id="attention-math" />
      <TextSection title="The Math" level={3}>
        <p>
          Given queries Q, keys K, and values V — all derived from the input by learned
          weight matrices — scaled dot-product attention is:
        </p>
      </TextSection>

      <Callout type="math">
        Attention(Q, K, V) = softmax( QKᵀ / √d<sub>k</sub> ) · V
      </Callout>

      <SectionAnchor id="attention-code" />
      <TextSection title="Code" level={3}>
        <p>Here is a minimal NumPy implementation:</p>
      </TextSection>

      <CodeSnippet language="python" title="Scaled dot-product attention (NumPy)">
{`import numpy as np

def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

def attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)   # (seq, seq)
    weights = softmax(scores)           # probabilities
    return weights @ V, weights         # output + weights

# Example — 4 tokens, embedding dim 8
seq_len, d_k = 4, 8
Q = np.random.randn(seq_len, d_k)
K = np.random.randn(seq_len, d_k)
V = np.random.randn(seq_len, d_k)

out, w = attention(Q, K, V)
print("output shape:", out.shape)   # (4, 8)
print("weights:\n", w.round(3))`}
      </CodeSnippet>

      <SectionAnchor id="attention-weights" />
<DiagramSection
  title="Step 1 → 2: Attention Scores to Weights"
  caption='Query is x⁽²⁾ "journey". Step 1 computes dot-product scores ω. Step 2 applies softmax to normalise them into weights α.'
>
  <AttentionWeightsDiagram />
</DiagramSection>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT APP — you don't need to touch this
// ════════════════════════════════════════════════════════════════

const NOTES = [
];

function App() {
  return (
    <SectionTrackerProvider>
      <div className="App">
        <header className="App-header">
          <h1>InsideLLMs</h1>
        </header>
        <div className="App-container">
          <div className="Navigation-Section">
            <Sidebar items={NAV_ITEMS} />
          </div>
          <div className="Content-Section">
            <div className="Content-Main">
              <Content />
            </div>
            <div className="Content-Notes">
              <StickyNotesRail notes={NOTES} />
            </div>
          </div>
        </div>
      </div>
    </SectionTrackerProvider>
  );
}

export default App;

