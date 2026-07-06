export const SNIPPETS = {
    "Rear Admiral": `
#define in :
#define len(arr) arr.size()
#define input(data) cin >> data
#define print(data) cout << data
#define println(data) cout << data << endl
#define range(i, s, e) for(int i=s; i<e; i++)
#define revrange(i, s, e) for (int i=e-1; i>=s; i--)
  `,
  "Vice Admiral": `
#define pb(data) push_back(data)
#define popb(data) pop_back(data)
#define sortall(arr) sort(arr.begin(), arr.end())
#define revsortall(arr) sort(arr.rbegin(), arr.rend())
#define reverse(arr) reverse(arr.begin(), arr.end())
  `,
  "Admiral": `

  `,

  "Fleet Admiral": `
#define sum(arr) accumulate(arr.begin(), arr.end(), 0)
#define maxm(arr) *max_element(arr.begin(), arr.end())
#define minm(arr) *min_element(arr.begin(), arr.end())
#define maxmIdx(arr) max_element(arr.begin(), arr.end()) - arr.begin()
#define minmIdx(arr) min_element(arr.begin(), arr.end()) - arr.begin()
`,

  "Singly LinkedList": `
class node{
    public:
        int val;
        node *next;
    node(int val) : val(val), next(nullptr) {}
    node(int val, node *next) : val(val), next(next) {}
};
  `,
  "Doubly LinkedList": `
class node{
    public:
        int val;
        node *next;
        node* prev;
    node(int val) : val(val), next(nullptr), prev(nullptr) {}
    node(int val, node *next, node *prev) : val(val), next(next), prev(prev) {}
}`,
  "Binary Tree": `
class node{
    public:
        int val;
        node *left;
        node *right;
    node(int val) : val(val), left(nullptr), right(nullptr) {}
    node(int val, node *left, node *right) : val(val), left(left), right(right) {}
}`,
  graph: `
class node{
    public:
        int val;
        vector<node*> neighbors;
    node(int val) : val(val) {}
    node(int val, vector<node*> neighbors) : val(val), neighbors(neighbors) {}
}`,
  "": ``,
  "": ``,
  "": ``,
  "": ``,
};
